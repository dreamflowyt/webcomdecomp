import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shrink, Mail, BrainCircuit, Binary, Repeat, TextCursorInput, Package, FileText } from 'lucide-react';

const algorithms = [
  {
    icon: Binary,
    name: 'Huffman Coding',
    description: 'Best for files with frequent repeating characters.',
  },
  {
    icon: Repeat,
    name: 'Run-Length Encoding',
    description: 'Best for files with long sequences of the same character.',
  },
  {
    icon: TextCursorInput,
    name: 'LZ77',
    description: 'Best for text with repeating sequences of characters.',
  },
  {
    icon: Package,
    name: 'DEFLATE',
    description: 'Combines LZ77 and Huffman. Great for general purpose use.',
  },
  {
    icon: FileText,
    name: 'PDF Optimization',
    description: 'Advanced optimization for PDF files, including image re-compression.',
  },
];

export default function WelcomePage() {
  return (
    <div className="bg-background dark:bg-black/95 text-center p-4 antialiased">
       <main className="max-w-5xl mx-auto flex flex-col items-center py-12">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-primary mb-4 mt-12">
                ShrinkWrap
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                An intelligent file compression and decompression tool. Effortlessly reduce file sizes with smart algorithm suggestions and share them in seconds.
            </p>
        </div>

        <Link href="/tool">
          <Button size="lg" className="px-10 py-6 text-lg">
            Launch App
          </Button>
        </Link>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          <div className="p-6 border rounded-lg bg-card/50">
            <Shrink className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-headline text-lg mb-2 font-semibold">Efficient Compression</h3>
            <p className="text-muted-foreground text-sm">Choose from multiple algorithms to compress your files, or decompress files created with ShrinkWrap.</p>
          </div>
          <div className="p-6 border rounded-lg bg-card/50">
            <BrainCircuit className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-headline text-lg mb-2 font-semibold">AI-Powered Suggestions</h3>
            <p className="text-muted-foreground text-sm">Our AI analyzes your file type to recommend the most effective compression algorithm, saving you time.</p>
          </div>
          <div className="p-6 border rounded-lg bg-card/50">
            <Mail className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-headline text-lg mb-2 font-semibold">Share with Ease</h3>
            <p className="text-muted-foreground text-sm">Download your processed files or send them directly to any email address, right from the app.</p>
          </div>
        </div>

        <div className="mt-24 w-full">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
              Our Algorithms Explained
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              ShrinkWrap uses a variety of powerful algorithms. Here’s a quick guide to what they do best.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {algorithms.map((algo) => (
              <div key={algo.name} className="p-6 border rounded-lg bg-card/50">
                <algo.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-headline text-lg mb-2 font-semibold">{algo.name}</h3>
                <p className="text-muted-foreground text-sm">{algo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
