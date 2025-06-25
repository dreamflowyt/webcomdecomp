'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import { suggestCompressionAlgorithm, SuggestCompressionAlgorithmOutput } from '@/ai/flows/suggest-compression-algorithm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatBytes } from '@/lib/utils';
import { UploadCloud, File as FileIcon, X, Sparkles, Cpu, Download, BarChart2, CircleDashed } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Algorithm = 'huffman' | 'rle' | 'lz77' | 'deflate' | 'pdf-optimization';
type OperationType = 'compression' | 'decompression';

interface Results {
  originalSize: number;
  processedSize: number;
  ratio?: number;
  processingTime: number;
  type: OperationType;
}

const algorithmDetails: Record<Algorithm, { name: string; description: string }> = {
  huffman: {
    name: 'Huffman Coding',
    description: 'Best for files with frequent repeating characters.',
  },
  rle: {
    name: 'Run-Length Encoding',
    description: 'Best for files with long sequences of the same character.',
  },
  lz77: {
    name: 'LZ77',
    description: 'Best for text with repeating sequences of characters.',
  },
  deflate: {
    name: 'DEFLATE',
    description: 'Combines LZ77 and Huffman. Great for general purpose use.',
  },
  'pdf-optimization': {
    name: 'PDF Optimization',
    description: 'Advanced optimization for PDF files, including image re-compression.',
  },
};

const getAlgorithmKeyByName = (name: string): Algorithm | undefined => {
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.includes('huffman')) return 'huffman';
  if (lowerCaseName.includes('rle') || lowerCaseName.includes('run-length')) return 'rle';
  if (lowerCaseName.includes('lz77')) return 'lz77';
  if (lowerCaseName.includes('deflate')) return 'deflate';
  if (lowerCaseName.includes('pdf')) return 'pdf-optimization';
  return undefined;
};

const getFallbackSuggestion = (fileType: string): SuggestCompressionAlgorithmOutput => {
  if (fileType === 'text') {
    return {
      suggestedAlgorithm: 'DEFLATE',
    };
  }
  if (fileType === 'image') {
    return {
      suggestedAlgorithm: 'Run-Length Encoding',
    };
  }
  if (fileType === 'pdf') {
    return {
      suggestedAlgorithm: 'PDF Optimization',
    };
  }
  return {
    suggestedAlgorithm: 'Huffman Coding',
  };
};

export default function ShrinkWrapPage() {
  const [file, setFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState<Algorithm>('huffman');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<SuggestCompressionAlgorithmOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setResults(null);
    setAiSuggestion(null);
    setIsAiLoading(true);

    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || 'binary';
    let fileType = 'binary';
    if (['txt', 'md', 'html', 'css', 'js', 'json', 'xml'].includes(fileExtension)) {
      fileType = 'text';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'webp'].includes(fileExtension)) {
      fileType = 'image';
    } else if (fileExtension === 'pdf') {
      fileType = 'pdf';
    }

    try {
      const suggestion = await suggestCompressionAlgorithm({ fileType });
      setAiSuggestion(suggestion);
      const suggestedKey = getAlgorithmKeyByName(suggestion.suggestedAlgorithm);
      if (suggestedKey) {
        setAlgorithm(suggestedKey);
      }
    } catch (err) {
      console.error(err);
      const fallbackSuggestion = getFallbackSuggestion(fileType);
      setAiSuggestion(fallbackSuggestion);
      const fallbackKey = getAlgorithmKeyByName(fallbackSuggestion.suggestedAlgorithm);
      if (fallbackKey) {
        setAlgorithm(fallbackKey);
      }

      toast({
        title: 'AI Suggestion Failed',
        description: 'Using a fallback suggestion based on your file type.',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResults(null);
    setAiSuggestion(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFile = (type: OperationType) => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: `Please upload a file to ${type}.`,
      });
      return;
    }

    setIsProcessing(true);
    setResults(null);

    const startTime = performance.now();

    setTimeout(() => {
      let processedSize: number, ratio: number | undefined;
      const originalSize = file.size;

      if (type === 'compression') {
        const factors: Record<Algorithm, number> = { huffman: 0.45, rle: 0.6, lz77: 0.55, deflate: 0.40, 'pdf-optimization': 0.35 };
        processedSize = originalSize * factors[algorithm];
        ratio = ((originalSize - processedSize) / originalSize) * 100;
      } else { // Decompression
        const factors: Record<Algorithm, number> = { huffman: 1/0.45, rle: 1/0.6, lz77: 1/0.55, deflate: 1/0.40, 'pdf-optimization': 1/0.35 };
        processedSize = originalSize * factors[algorithm]; // Here originalSize is the compressed size
      }
      
      const processingTime = (performance.now() - startTime) / 1000;

      setResults({
        originalSize: type === 'compression' ? originalSize : processedSize,
        processedSize: type === 'compression' ? processedSize : originalSize,
        ratio,
        processingTime,
        type,
      });
      setIsProcessing(false);
    }, 1500 + Math.random() * 500);
  };

  const handleDownload = () => {
    if (!file || !results) return;

    const content = `This is a dummy file processed by ShrinkWrap.\n- Original File: ${file.name}\n- Algorithm: ${algorithmDetails[algorithm].name}\n- Operation: ${results.type}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    let fileName = 'processed_file.txt';
    const nameParts = file.name.split('.');
    const baseName = nameParts.slice(0, -1).join('.');

    if (results.type === 'compression') {
        fileName = `${baseName || file.name}.${algorithm}.shrnk`;
    } else {
        fileName = `${baseName}_decompressed.${nameParts.pop()}`;
    }

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderResults = () => {
    if (isProcessing) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
        </div>
      );
    }

    if (!results) {
      return (
        <div className="text-center text-muted-foreground py-10">
          <CircleDashed className="mx-auto h-12 w-12 mb-4 animate-spin" style={{animationDuration: '5s'}} />
          <p>Your results will appear here after processing.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Original Size:</span>
          <span className="font-medium">{formatBytes(results.type === 'compression' ? results.originalSize : results.processedSize)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{results.type === 'compression' ? 'Compressed Size:' : 'Decompressed Size:'}</span>
          <span className="font-medium text-primary">{formatBytes(results.type === 'compression' ? results.processedSize : results.originalSize)}</span>
        </div>
        {results.ratio !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Compression Ratio:</span>
            <span className="font-medium text-accent">{results.ratio.toFixed(2)}% savings</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Processing Time:</span>
          <span className="font-medium">{results.processingTime.toFixed(2)}s</span>
        </div>
        <Separator className="my-4" />
        <Button onClick={handleDownload} className="w-full bg-accent hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" />
          Download Processed File
        </Button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background dark:bg-black/95">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">ShrinkWrap</h1>
          <p className="text-muted-foreground mt-2 text-lg">Intelligent file compression and decompression.</p>
        </header>

        <main className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            <Card className="flex-grow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Cpu /> Start Processing</CardTitle>
                <CardDescription>Upload a file and choose an algorithm.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {file ? (
                  <div className="flex items-center justify-between p-3 rounded-md border bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-6 w-6 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-secondary/30 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="font-semibold">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground">Any file type supported</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
                
                <div>
                  <Label className="font-semibold mb-2 block">Choose an algorithm:</Label>
                  <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as Algorithm)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an algorithm..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(algorithmDetails).map(([key, { name, description }]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex flex-col items-start">
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">{description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => processFile('compression')} disabled={isProcessing || !file} className="w-full">
                  Compress
                </Button>
                <Button onClick={() => processFile('decompression')} disabled={isProcessing || !file} variant="outline" className="w-full">
                  Decompress
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent" /> AI Suggestion</CardTitle>
              </CardHeader>
              <CardContent>
                {isAiLoading ? (
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ) : aiSuggestion ? (
                  <div>
                    <p className="font-medium">For your file type, we suggest: <span className="text-primary">{aiSuggestion.suggestedAlgorithm}</span></p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Upload a file to get an AI-powered recommendation.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-8 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2 /> Results</CardTitle>
                <CardDescription>View the outcome of your file operation.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderResults()}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
