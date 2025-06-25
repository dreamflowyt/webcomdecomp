import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shrink, Mail, BrainCircuit, Zap } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-black/95 text-center p-4 antialiased">
       <main className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-8">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-4">
              <Zap className="mr-2 h-4 w-4" /> AI-Powered File Management
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-primary mb-4">
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

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
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
      </main>
    </div>
  );
}
