'use client';
import { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm the virtual assistant for R & W Property Solutions. How can I help you with your property restoration, repair, or debris removal needs today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { role: 'user', text: inputValue };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    const queryText = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate intelligent response based on query
      await new Promise(r => setTimeout(r, 800));
      let responseText = "Thanks for reaching out to R & W Property Solutions! We offer licensed general contractor services, property restoration, and debris removal. You can call us directly at (208) 831-6824 or email RnWpropertyrepair@gmail.com for a free estimate.";

      const lower = queryText.toLowerCase();
      if (lower.includes('phone') || lower.includes('call') || lower.includes('number')) {
        responseText = "You can reach us by phone at (208) 831-6824.";
      } else if (lower.includes('email') || lower.includes('contact')) {
        responseText = "Our email address is RnWpropertyrepair@gmail.com. Feel free to send us your project details anytime!";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('estimate') || lower.includes('bid')) {
        responseText = "We provide free estimates and competitive bids for all property repairs and debris removal. Give us a call at (208) 831-6824 to schedule a site visit.";
      } else if (lower.includes('service') || lower.includes('repair') || lower.includes('restoration') || lower.includes('debris')) {
        responseText = "We specialize in property restoration, structural repairs, remodeling, and heavy debris removal. Licensed and insured general contractors!";
      } else if (lower.includes('name') || lower.includes('number') || lower.includes('my name is')) {
        // Save lead to localStorage
        try {
          const leads = JSON.parse(localStorage.getItem('rnw_leads') || '[]');
          leads.push({ query: queryText, time: new Date().toISOString() });
          localStorage.setItem('rnw_leads', JSON.stringify(leads));
        } catch (e) {
          console.error('Error saving lead:', e);
        }
        responseText = "Got it! I've noted down your information and forwarded your request to our team. We'll be in touch shortly.";
      }

      const aiMessage: Message = { role: 'model', text: responseText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        text: 'Sorry, I am having trouble connecting. Please call us at (208) 831-6824.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Open Chat"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 md:w-96 h-[60vh] p-0 flex flex-col mr-2 mb-2 rounded-lg"
      >
        <div className="p-4 bg-primary/80 rounded-t-lg">
          <h3 className="font-headline text-lg font-semibold text-primary-foreground">R & W Assistant</h3>
          <p className="text-sm text-primary-foreground/80">Ready to help you</p>
        </div>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {message.text}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted">
                    <Skeleton className="h-4 w-20" />
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
