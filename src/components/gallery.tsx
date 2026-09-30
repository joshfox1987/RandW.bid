'use client';
import { useState, useRef, useEffect, memo, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, ChevronLeft, ChevronRight, ImagePlus, Trash2, Eraser, MoveLeft, MoveRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const DEFAULT_GALLERY_ITEMS = [
  {
    id: 'default-1',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f1f1d',
    type: 'image',
    title: 'Property Restoration',
    description: 'Full-scale structural restoration and renovation after storm damage.',
    order: 0,
  },
  {
    id: 'default-2',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    type: 'image',
    title: 'Debris Removal & Clean-up',
    description: 'Safe and efficient heavy debris clearance and site prep.',
    order: 1,
  },
  {
    id: 'default-3',
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece',
    type: 'image',
    title: 'Interior Remodeling',
    description: 'Custom carpentry, drywall restoration, and finish work by licensed general contractors.',
    order: 2,
  },
  {
    id: 'default-4',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f',
    type: 'image',
    title: 'Roof & Siding Repair',
    description: 'Weatherproofing, shingle replacement, and exterior siding restoration.',
    order: 3,
  },
];

const GalleryMediaItem = memo(({ item, isActive, isPriority }: { item: any, isActive: boolean, isPriority: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mediaUrl = item.imageUrl || item.url;
  const mediaType = item.type || 'image';

  if (!mediaUrl) return null;

  return (
    <div className={cn(
      "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-black flex items-center justify-center",
      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
    )}>
      {mediaType === 'video' ? (
        <video
          src={mediaUrl}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : mediaType === 'audio' ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-pulse border border-primary/40">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <audio src={mediaUrl} controls className="w-full max-w-md mt-4 accent-amber-500" />
        </div>
      ) : (
        <Image
          src={mediaUrl}
          alt={item.description || 'R & W Property Solutions Project'}
          fill
          className={cn(
            "object-cover transition-all duration-1000",
            isLoaded ? "scale-100 blur-0" : "scale-105 blur-lg"
          )}
          onLoad={() => setIsLoaded(true)}
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          unoptimized
        />
      )}
      
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/90 backdrop-blur-md border rounded-xl shadow-xl z-20 max-w-xl">
         <div className={cn(
           "transition-all duration-1000 delay-300 transform",
           isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
         )}>
            <h3 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-primary rounded-full" />
                {item.title || 'Project Update'} {mediaType !== 'image' && `(${mediaType.toUpperCase()})`}
            </h3>
            <p className="text-foreground text-base md:text-lg font-headline font-bold leading-snug">
                {item.description || 'Professional property restoration and service.'}
            </p>
         </div>
      </div>
    </div>
  );
});

GalleryMediaItem.displayName = 'GalleryMediaItem';

export default function Gallery() {
  const { toast } = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<any[]>(DEFAULT_GALLERY_ITEMS);
  const [areItemsLoading, setAreItemsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAdminControls, setShowAdminControls] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rnw_gallery_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading gallery from localStorage:', e);
    } finally {
      setAreItemsLoading(false);
    }
  }, []);

  const saveItemsToStorage = (updated: any[]) => {
    const sorted = updated.map((item, idx) => ({ ...item, order: idx }));
    setItems(sorted);
    try {
      localStorage.setItem('rnw_gallery_images', JSON.stringify(sorted));
    } catch (e) {
      console.error('Error saving gallery to localStorage:', e);
    }
  };

  useEffect(() => {
    if (!items || items.length <= 1 || isPaused || showAdminControls) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items, isPaused, showAdminControls]);

  const handleUploadClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    toast({ title: 'Processing Upload', description: `Adding ${files.length} project media file(s)...` });

    const startOrder = items.length > 0 
      ? Math.max(...items.map((item: any) => item.order || 0)) + 1 
      : 0;

    const newItems = [...items];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });

        let mediaType = 'image';
        if (file.type.startsWith('video/')) {
          mediaType = 'video';
        } else if (file.type.startsWith('audio/')) {
          mediaType = 'audio';
        }

        const newItem = {
          id: `custom-${Date.now()}-${i}`,
          url: dataUrl,
          imageUrl: dataUrl,
          type: mediaType,
          title: mediaType === 'video' ? 'Video Showcase' : mediaType === 'audio' ? 'Audio Recording' : 'Project Update',
          description: `Custom uploaded ${mediaType}: ${file.name.replace(/\.[^/.]+$/, '')}`,
          order: startOrder + i,
        };

        newItems.push(newItem);
      } catch (error) {
        console.error('File read error:', error);
      }
    }

    saveItemsToStorage(newItems);
    if (inputFileRef.current) inputFileRef.current.value = '';
    setIsUploading(false);
    toast({ title: 'Success', description: 'Media added to gallery successfully!' });
  };

  const nextSlide = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items]);

  const prevSlide = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items]);

  const deleteItem = (id: string) => {
    if (!window.confirm('Delete this project media from gallery?')) return;
    try {
      const updated = items.filter(item => item.id !== id);
      saveItemsToStorage(updated);
      toast({ title: 'Removed' });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({ variant: 'destructive', title: 'Error' });
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    saveItemsToStorage(updated);
    setCurrentIndex(toIndex);
  };

  const clearGallery = () => {
    if (!window.confirm('Reset gallery to default media items?')) return;
    try {
      saveItemsToStorage(DEFAULT_GALLERY_ITEMS);
      setCurrentIndex(0);
      toast({ title: 'Gallery Reset' });
    } catch (error) {
      console.error('Error resetting gallery:', error);
      toast({ variant: 'destructive', title: 'Reset Failed' });
    }
  };

  return (
    <section id="gallery" className="w-full bg-background py-12 md:py-20 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-16">
          <div className="space-y-2">
            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Project Gallery
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg md:text-xl mx-auto">
                A showcase of our restoration, custom flooring, and video highlights.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
                variant="default"
                onClick={handleUploadClick}
                disabled={isUploading}
                className="rounded-full px-8 h-12 text-base font-semibold transition-all hover:scale-105"
            >
                {isUploading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Upload className="mr-2 h-5 w-5" />}
                {isUploading ? 'Processing...' : 'Add Media'}
            </Button>
            
            <div className="flex gap-2">
              <Button
                  variant="outline"
                  onClick={() => setShowAdminControls(!showAdminControls)}
                  className="rounded-full px-8 h-12 text-base"
              >
                  {showAdminControls ? 'View Gallery' : 'Manage & Reorder'}
              </Button>
              {showAdminControls && (
                 <Button
                    variant="destructive"
                    onClick={clearGallery}
                    disabled={isUploading}
                    className="rounded-full px-4 h-12"
                    title="Reset Gallery"
                >
                    <Eraser className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <input type="file" ref={inputFileRef} onChange={handleFileChange} className="hidden" accept="image/*,video/mp4,audio/wav,audio/*" multiple />
          </div>
        </div>

        {showAdminControls ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {items.map((item, index) => {
                    const mediaUrl = item.imageUrl || item.url;
                    const mediaType = item.type || 'image';

                    return (
                        <div key={item.id} className="relative aspect-[4/3] rounded-xl overflow-hidden border shadow-sm group bg-muted flex flex-col">
                            {mediaType === 'video' ? (
                                <video src={mediaUrl} className="w-full h-full object-cover" muted />
                            ) : mediaType === 'audio' ? (
                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white p-4 text-center text-xs font-bold">
                                    🎵 Audio Clip ({item.title})
                                </div>
                            ) : (
                                <Image src={mediaUrl} alt="" fill className="object-cover" unoptimized />
                            )}

                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold tracking-wider">
                                #{index + 1} ({mediaType})
                            </div>

                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 gap-2">
                                <div className="flex gap-2">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        disabled={index === 0}
                                        onClick={() => moveItem(index, index - 1)}
                                        className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 text-white border-0"
                                        title="Move Left / Up"
                                    >
                                        <MoveLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        disabled={index === items.length - 1}
                                        onClick={() => moveItem(index, index + 1)}
                                        className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 text-white border-0"
                                        title="Move Right / Down"
                                    >
                                        <MoveRight className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteItem(item.id)}
                                    className="rounded-full text-xs px-4 h-8"
                                >
                                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="relative group max-w-4xl mx-auto overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl aspect-[4/3] bg-black border-4 md:border-8 border-muted/10" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {areItemsLoading ? (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary opacity-30" />
                </div>
            ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 p-8 text-center">
                    <ImagePlus className="h-16 w-16 opacity-10" />
                    <p className="text-xl font-bold text-foreground">Gallery is empty</p>
                    <p className="text-sm">Upload media to see them here.</p>
                </div>
            ) : (
                <>
                {items.map((item, index) => {
                    const isActive = index === currentIndex;
                    const isNext = index === (currentIndex + 1) % items.length;
                    
                    if (!isActive && !isNext) return null;

                    return (
                    <GalleryMediaItem 
                        key={item.id}
                        item={item}
                        isActive={isActive}
                        isPriority={isActive}
                    />
                    );
                })}

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-primary text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xl border border-white/5"
                    aria-label="Previous"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-primary text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xl border border-white/5"
                    aria-label="Next"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
                    {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                        "h-1.5 transition-all duration-700 rounded-full",
                        index === currentIndex ? "w-6 bg-primary shadow-lg" : "w-1.5 bg-white/40"
                        )}
                    />
                    ))}
                </div>

                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] md:text-xs font-bold tracking-widest">
                        {currentIndex + 1} / {items.length}
                    </div>
                </div>
                </>
            )}
            </div>
        )}
      </div>
    </section>
  );
}
