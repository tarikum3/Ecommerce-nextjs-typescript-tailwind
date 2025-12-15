
// // import { Hero } from "@/app/components/sections/Hero"
// import  Hero  from "@/app/components/sections/hero/Hero"
// import CategorySection from "@/app/components/Category/CategorySection";
// import TestimonialsSection from "@/app/components/sections/testimonial/TestimonialsSection";
// import FeaturedSection from "@/app/components/sections/featured/FeaturedSection";
// import FavoritesSection from "@/app/components/sections/favorite/FavoritesSection";
// //export const dynamic = "force-dynamic";

// //export const revalidate = 3600;
// //export const revalidate = 3600;
// export const metadata = {
//   description: "Modalinda shop.",
//   openGraph: {
//     type: "website",
//   },
// };
// export default async function Home() {
//   return (
//     <>
//    <Hero />
//    <CategorySection />
//    <TestimonialsSection />
//    <FeaturedSection />
//    <FavoritesSection />
//     </>
//   );
// }






// 'use client';

// import React, { useState, useRef, useCallback } from 'react';
// import { Upload, RefreshCw, Download, Zap, Sparkles, X, Wand2, ScanEye, Shirt, Footprints, CheckCircle2, AlertCircle, LayoutGrid, Maximize2 } from 'lucide-react';
// import { Button, buttonVariants } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { Badge } from "@/app/components/ui/badge"

// export default function AIDesignAgent() {
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
  
//   // AGENT STATE
//   const [analysisStatus, setAnalysisStatus] = useState('idle'); // idle, analyzing, valid, invalid, error
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isRemixing, setIsRemixing] = useState(false);
  
//   const [prompt, setPrompt] = useState('');
//   const [generatedImages, setGeneratedImages] = useState([]); // Array for multiple results
//   const fileInputRef = useRef(null);

//   // --- 1. HANDLING FILE UPLOAD & AGENT ANALYSIS ---
//   const handleFile = async (selectedFile) => {
//     if (!selectedFile) return;

//     // Reset State
//     setFile(selectedFile);
//     setGeneratedImages([]);
//     setAnalysisStatus('analyzing');
//     setAnalysisResult(null);

//     // Create Preview
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Url = reader.result;
//       setPreviewUrl(base64Url);
      
//       // Trigger Agent Analysis
//       await analyzeImage(base64Url);
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const analyzeImage = async (imageBase64) => {
//     try {
//       // -----------------------------------------------------------
//       // REAL API CALL PATTERN:
//       // const res = await fetch('/api/analyze', { 
//       //   method: 'POST', 
//       //   body: JSON.stringify({ image: imageBase64 }) 
//       // });
//       // const data = await res.json();
//       // -----------------------------------------------------------

//       // SIMULATION FOR DEMO PREVIEW
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Agent Logic: Strictly checking for cloth/fashion items
//       const mockData = {
//         isValid: true,
//         itemType: "Clothing Item",
//         confidence: 0.99,
//         reasoning: "Detected textile material and wearable structure consistent with fashion apparel."
//       };
      
//       if (mockData.isValid) {
//         setAnalysisStatus('valid');
//         setAnalysisResult(mockData);
//       } else {
//         setAnalysisStatus('invalid');
//       }

//     } catch (error) {
//       console.error("Analysis failed", error);
//       setAnalysisStatus('error');
//     }
//   };

//   // --- 2. HANDLING MULTI-IMAGE VARIATION GENERATION ---
//   const handleRemix = async () => {
//     if (!file || !prompt) return;
//     setIsRemixing(true);
//     setGeneratedImages([]); // Clear previous

//     try {
//       // -----------------------------------------------------------
//       // REAL API CALL PATTERN (Returns array of images):
//       // const res = await fetch('/api/remix', {
//       //   method: 'POST',
//       //   body: JSON.stringify({ 
//       //     image: previewUrl, 
//       //     prompt, 
//       //     itemType: analysisResult.itemType 
//       //   })
//       // });
//       // const data = await res.json(); // { images: [...] }
//       // -----------------------------------------------------------

//       // SIMULATION
//       await new Promise(resolve => setTimeout(resolve, 3500));
      
//       // Mocking 4 variations strictly based on input structure
//       setGeneratedImages([
//         "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
//         "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
//         "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
//         "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop"
//       ]);

//     } catch (error) {
//       console.error("Remix failed", error);
//     } finally {
//       setIsRemixing(false);
//     }
//   };

//   const onDrop = useCallback((e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile?.type.startsWith('image/')) handleFile(droppedFile);
//   }, []);

//   const clearAll = () => {
//     setFile(null);
//     setPreviewUrl(null);
//     setGeneratedImages([]);
//     setAnalysisStatus('idle');
//     setPrompt('');
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
//       {/* Header */}
//       <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
//               <ScanEye className="h-5 w-5 text-white" />
//             </div>
//             <span className="font-bold text-lg tracking-tight">Design<span className="text-indigo-400">Agent</span></span>
//           </div>
//           <div className="flex items-center gap-3">
//              <span className="text-xs text-zinc-500 font-mono hidden sm:block">STATUS: {analysisStatus.toUpperCase()}</span>
//              <div className={`h-2 w-2 rounded-full ${analysisStatus === 'analyzing' || isRemixing ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
//           {/* LEFT: WORKSPACE & PREVIEW */}
//           <div className="lg:col-span-8 space-y-6">
//              {/* Upload / Comparison Area */}
//              <div className="relative group min-h-[600px] bg-zinc-900/20 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col">
//                 {!file ? (
//                   <div 
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={onDrop}
//                     onClick={() => fileInputRef.current?.click()}
//                     className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900/40 transition-colors"
//                   >
//                     <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 shadow-xl group-hover:scale-110 transition-transform duration-300">
//                       <Upload className="h-8 w-8 text-zinc-400" />
//                     </div>
//                     <h2 className="text-2xl font-semibold text-white mb-2">Upload Product Photo</h2>
//                     <p className="text-zinc-500 max-w-sm text-center">Drag & drop your t-shirt, sneaker, or accessory here.</p>
//                     <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} />
//                   </div>
//                 ) : (
//                   <div className="flex flex-col h-full">
//                     {/* Top Bar inside Workspace */}
//                     <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-950">
//                         <div className="flex items-center gap-2">
//                             <Badge variant="outline">Original Input</Badge>
//                             {generatedImages.length > 0 && <Badge variant="success" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{generatedImages.length} Variations Generated</Badge>}
//                         </div>
//                         <Button size="sm" variant="ghost" onClick={clearAll} className="text-zinc-400 hover:text-white">
//                             <X className="h-4 w-4 mr-2" /> Start Over
//                         </Button>
//                     </div>

//                     {/* Split View: Original vs Grid */}
//                     <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
                        
//                         {/* Original Image (1/3 width) */}
//                         <div className="relative border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col items-center justify-center">
//                             <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
//                                 <img src={previewUrl} className="w-full h-full object-contain" alt="Original" />
                                
//                                 {/* Analysis Overlays */}
//                                 {analysisStatus === 'analyzing' && (
//                                     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
//                                         <ScanEye className="h-10 w-10 text-indigo-400 animate-pulse mb-4" />
//                                         <p className="text-indigo-200 font-mono text-sm">VERIFYING CLOTH ITEM...</p>
//                                     </div>
//                                 )}
                                
//                                 {analysisStatus === 'invalid' && (
//                                     <div className="absolute inset-0 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 px-6 text-center">
//                                         <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
//                                         <h3 className="text-xl font-bold text-white mb-2">Invalid Item</h3>
//                                         <p className="text-red-200 mb-6">This does not appear to be a cloth item. Please upload fashion apparel.</p>
//                                         <Button onClick={clearAll} variant="destructive">Try Another</Button>
//                                     </div>
//                                 )}
//                             </div>
//                             <p className="mt-4 text-xs text-zinc-500 uppercase tracking-widest font-semibold">Reference Image</p>
//                         </div>

//                         {/* Generated Grid (2/3 width) */}
//                         <div className="md:col-span-2 bg-zinc-900/50 p-6 relative overflow-y-auto">
//                            {generatedImages.length > 0 ? (
//                                <div className="grid grid-cols-2 gap-4 h-full content-start">
//                                    {generatedImages.map((img, idx) => (
//                                        <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer hover:border-indigo-500/50 transition-colors animate-in fade-in zoom-in duration-500" style={{animationDelay: `${idx * 150}ms`}}>
//                                            <img src={img} alt={`Variant ${idx + 1}`} className="w-full h-full object-cover" />
//                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                                                <Button size="icon" variant="secondary" className="rounded-full"><Maximize2 className="h-4 w-4" /></Button>
//                                                <Button size="icon" variant="default" className="rounded-full"><Download className="h-4 w-4" /></Button>
//                                            </div>
//                                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-medium text-white">V{idx + 1}</div>
//                                        </div>
//                                    ))}
//                                </div>
//                            ) : (
//                                <div className="h-full flex flex-col items-center justify-center text-zinc-600">
//                                    {isRemixing ? (
//                                        <div className="flex flex-col items-center gap-4">
//                                             <div className="grid grid-cols-2 gap-2 animate-pulse">
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                             </div>
//                                             <p className="text-indigo-400 font-mono text-xs animate-pulse">GENERATING VARIATIONS...</p>
//                                        </div>
//                                    ) : (
//                                        <>
//                                            <LayoutGrid className="h-12 w-12 opacity-20 mb-3" />
//                                            <p>Variations will appear here</p>
//                                        </>
//                                    )}
//                                </div>
//                            )}
//                         </div>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>

//           {/* RIGHT: AGENT CONTROLS */}
//           <div className="lg:col-span-4 space-y-6">
            
//             {/* Analysis Report Card */}
//             {file && (
//               <div className={`p-5 rounded-xl border transition-all duration-500 ${analysisStatus === 'valid' ? 'bg-zinc-900/60 border-green-500/30' : 'bg-zinc-900/30 border-zinc-800'}`}>
//                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                     <ScanEye className="h-4 w-4" /> Agent Verification
//                  </h3>
                 
//                  {analysisStatus === 'analyzing' && (
//                     <div className="space-y-3">
//                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
//                           <div className="h-full bg-indigo-500 w-2/3 animate-[shimmer_1s_infinite]"></div>
//                        </div>
//                        <p className="text-xs text-zinc-500">Checking for fashion items...</p>
//                     </div>
//                  )}

//                  {analysisStatus === 'valid' && analysisResult && (
//                     <div className="space-y-4 animate-in slide-in-from-top-2">
//                        <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
//                              <CheckCircle2 className="h-5 w-5 text-green-400" />
//                           </div>
//                           <div>
//                              <p className="text-white font-medium">Cloth Item Confirmed</p>
//                              <p className="text-xs text-green-400">
//                                 Ready for design generation
//                              </p>
//                           </div>
//                        </div>
//                     </div>
//                  )}
//               </div>
//             )}

//             {/* Prompting Controls */}
//             <div className={`space-y-6 transition-opacity duration-300 ${analysisStatus === 'valid' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
//                <div className="space-y-3">
//                   <Label className="text-indigo-100">Variation Prompt</Label>
//                   <p className="text-xs text-zinc-500">Describe the materials, colors, or patterns you want to apply to this specific shape.</p>
//                   <textarea 
//                     className="w-full h-32 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//                     placeholder="e.g. Change fabric to denim, add red stitching, make it look worn and vintage..."
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                   />
//                </div>

//                <Button 
//                   className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-900/20"
//                   onClick={handleRemix}
//                   disabled={isRemixing || !prompt}
//                >
//                   {isRemixing ? (
//                      <div className="flex items-center gap-2">
//                         <RefreshCw className="h-4 w-4 animate-spin" /> Generating 4 Variants...
//                      </div>
//                   ) : (
//                      <div className="flex items-center gap-2">
//                         <Wand2 className="h-4 w-4" /> Generate Variations
//                      </div>
//                   )}
//                </Button>
//             </div>
            
//             {!file && (
//                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
//                   <h4 className="text-sm font-medium text-white mb-2">Instructions</h4>
//                   <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4">
//                      <li>Upload a clear photo of the item.</li>
//                      <li>The Agent verifies it is a cloth item.</li>
//                      <li>Enter a text prompt for the design changes.</li>
//                      <li>We generate 4 variations strictly based on the original shape.</li>
//                   </ul>
//                </div>
//             )}

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// 'use client';

// import React, { useState, useRef, useCallback, ChangeEvent, DragEvent } from 'react';
// import { Upload, RefreshCw, Download, Zap, Sparkles, X, Wand2, ScanEye, Shirt, Footprints, CheckCircle2, AlertCircle, LayoutGrid, Maximize2 } from 'lucide-react';
// import { Button, buttonVariants } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { Badge } from "@/app/components/ui/badge"

// // Types matching your API responses
// type AnalysisResult = {
//   isValid: boolean;
//   itemType: string;
//   confidence: number;
//   reasoning: string;
//   storedImageUrl?: string; // URL from Supabase returned by Analyze API
// } | null;

// type AnalysisStatus = 'idle' | 'analyzing' | 'valid' | 'invalid' | 'error';

// export default function AIDesignAgent() {
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Local Base64 for immediate preview
//   const [storedImageUrl, setStoredImageUrl] = useState<string | null>(null); // Remote Supabase URL
  
//   // AGENT STATE
//   const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(null);
//   const [isRemixing, setIsRemixing] = useState(false);
  
//   const [prompt, setPrompt] = useState('');
//   const [generatedImages, setGeneratedImages] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // --- 1. HANDLING FILE UPLOAD & AGENT ANALYSIS ---
//   const handleFile = async (selectedFile: File | null) => {
//     if (!selectedFile) return;

//     // Reset State
//     setFile(selectedFile);
//     setGeneratedImages([]);
//     setStoredImageUrl(null);
//     setAnalysisStatus('analyzing');
//     setAnalysisResult(null);

//     // Create Local Preview
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Url = reader.result as string;
//       setPreviewUrl(base64Url);
      
//       // Trigger Agent Analysis
//       await analyzeImage(base64Url);
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const analyzeImage = async (imageBase64: string) => {
//     try {
//       const res = await fetch('/api/analyze', { 
//          method: 'POST', 
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ image: imageBase64 }) 
//       });

//       if (!res.ok) throw new Error('Analysis request failed');
      
//       const data: AnalysisResult = await res.json();
      
//       if (data && data.isValid) {
//         setAnalysisStatus('valid');
//         setAnalysisResult(data);
//         // Save the Supabase URL for the Remix step
//         if (data.storedImageUrl) {
//             setStoredImageUrl(data.storedImageUrl);
//         }
//       } else {
//         setAnalysisStatus('invalid');
//         setAnalysisResult(data); // Keep reasoning for UI
//       }

//     } catch (error) {
//       console.error("Analysis failed", error);
//       setAnalysisStatus('error');
//     }
//   };

//   // --- 2. HANDLING MULTI-IMAGE VARIATION GENERATION ---
//   const handleRemix = async () => {
//     if (!file || !prompt || !analysisResult) return;
    
//     setIsRemixing(true);
//     setGeneratedImages([]); // Clear previous

//     try {
//       // Use the stored Supabase URL if available (faster/cleaner), otherwise fallback to base64
//       const imageInput = storedImageUrl || previewUrl;

//       const res = await fetch('/api/remix', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ 
//            image: imageInput, 
//            prompt, 
//            itemType: analysisResult.itemType 
//          })
//       });

//       if (!res.ok) throw new Error('Remix request failed');

//       const data = await res.json(); // Expecting { images: string[] }
      
//       if (data.images && Array.isArray(data.images)) {
//           setGeneratedImages(data.images);
//       }

//     } catch (error) {
//       console.error("Remix failed", error);
//     } finally {
//       setIsRemixing(false);
//     }
//   };

//   const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile?.type.startsWith('image/')) handleFile(droppedFile);
//   }, []);

//   const onDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const clearAll = () => {
//     setFile(null);
//     setPreviewUrl(null);
//     setStoredImageUrl(null);
//     setGeneratedImages([]);
//     setAnalysisStatus('idle');
//     setAnalysisResult(null);
//     setPrompt('');
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
//       {/* Header */}
//       <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
//               <ScanEye className="h-5 w-5 text-white" />
//             </div>
//             <span className="font-bold text-lg tracking-tight">Design<span className="text-indigo-400">Agent</span></span>
//           </div>
//           <div className="flex items-center gap-3">
//              <span className="text-xs text-zinc-500 font-mono hidden sm:block">STATUS: {analysisStatus.toUpperCase()}</span>
//              <div className={`h-2 w-2 rounded-full ${analysisStatus === 'analyzing' || isRemixing ? 'bg-amber-400 animate-pulse' : analysisStatus === 'valid' ? 'bg-green-500' : analysisStatus === 'error' || analysisStatus === 'invalid' ? 'bg-red-500' : 'bg-zinc-600'}`}></div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
//           {/* LEFT: WORKSPACE & PREVIEW */}
//           <div className="lg:col-span-8 space-y-6">
//              {/* Upload / Comparison Area */}
//              <div className="relative group min-h-[600px] bg-zinc-900/20 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col">
//                 {!file ? (
//                   <div 
//                     onDragOver={onDragOver}
//                     onDrop={onDrop}
//                     onClick={() => fileInputRef.current?.click()}
//                     className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900/40 transition-colors"
//                   >
//                     <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 shadow-xl group-hover:scale-110 transition-transform duration-300">
//                       <Upload className="h-8 w-8 text-zinc-400" />
//                     </div>
//                     <h2 className="text-2xl font-semibold text-white mb-2">Upload Product Photo</h2>
//                     <p className="text-zinc-500 max-w-sm text-center">Drag & drop your t-shirt, sneaker, or accessory here.</p>
//                     <input 
//                       type="file" 
//                       ref={fileInputRef} 
//                       className="hidden" 
//                       accept="image/*" 
//                       onChange={(e: ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0] || null)} 
//                     />
//                   </div>
//                 ) : (
//                   <div className="flex flex-col h-full">
//                     {/* Top Bar inside Workspace */}
//                     <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-950">
//                         <div className="flex items-center gap-2">
//                             <Badge variant="outline">Original Input</Badge>
//                             {generatedImages.length > 0 && <Badge variant="default" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{generatedImages.length} Variations Generated</Badge>}
//                         </div>
//                         <Button size="sm" variant="ghost" onClick={clearAll} className="text-zinc-400 hover:text-white">
//                             <X className="h-4 w-4 mr-2" /> Start Over
//                         </Button>
//                     </div>

//                     {/* Split View: Original vs Grid */}
//                     <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
                        
//                         {/* Original Image (1/3 width) */}
//                         <div className="relative border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col items-center justify-center">
//                             <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
//                                 {previewUrl && <img src={previewUrl} className="w-full h-full object-contain" alt="Original" />}
                                
//                                 {/* Analysis Overlays */}
//                                 {analysisStatus === 'analyzing' && (
//                                     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
//                                         <ScanEye className="h-10 w-10 text-indigo-400 animate-pulse mb-4" />
//                                         <p className="text-indigo-200 font-mono text-sm">ANALYZING PRODUCT...</p>
//                                     </div>
//                                 )}
                                
//                                 {analysisStatus === 'invalid' && (
//                                     <div className="absolute inset-0 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 px-6 text-center">
//                                         <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
//                                         <h3 className="text-xl font-bold text-white mb-2">Invalid Item</h3>
//                                         <p className="text-red-200 mb-6 text-sm">
//                                             {analysisResult?.reasoning || "This does not appear to be a valid fashion product we can customize."}
//                                         </p>
//                                         <Button onClick={clearAll} variant="destructive">Try Another</Button>
//                                     </div>
//                                 )}
//                             </div>
//                             <p className="mt-4 text-xs text-zinc-500 uppercase tracking-widest font-semibold">Reference Image</p>
//                         </div>

//                         {/* Generated Grid (2/3 width) */}
//                         <div className="md:col-span-2 bg-zinc-900/50 p-6 relative overflow-y-auto">
//                            {generatedImages.length > 0 ? (
//                                <div className="grid grid-cols-2 gap-4 h-full content-start">
//                                    {generatedImages.map((img, idx) => (
//                                        <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer hover:border-indigo-500/50 transition-colors animate-in fade-in zoom-in duration-500" style={{animationDelay: `${idx * 150}ms`}}>
//                                            <img src={img} alt={`Variant ${idx + 1}`} className="w-full h-full object-cover" />
//                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                                                <Button size="icon" variant="secondary" className="rounded-full" onClick={() => window.open(img, '_blank')}>
//                                                    <Maximize2 className="h-4 w-4" />
//                                                </Button>
//                                                <Button size="icon" variant="default" className="rounded-full" onClick={() => {
//                                                    const a = document.createElement('a');
//                                                    a.href = img;
//                                                    a.download = `variant-${idx}.png`;
//                                                    a.click();
//                                                }}>
//                                                    <Download className="h-4 w-4" />
//                                                </Button>
//                                            </div>
//                                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-medium text-white">V{idx + 1}</div>
//                                        </div>
//                                    ))}
//                                </div>
//                            ) : (
//                                <div className="h-full flex flex-col items-center justify-center text-zinc-600">
//                                    {isRemixing ? (
//                                        <div className="flex flex-col items-center gap-4">
//                                             <div className="grid grid-cols-2 gap-2 animate-pulse">
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                                 <div className="w-16 h-16 bg-zinc-800 rounded-lg"></div>
//                                             </div>
//                                             <p className="text-indigo-400 font-mono text-xs animate-pulse">GENERATING VARIATIONS...</p>
//                                        </div>
//                                    ) : (
//                                        <>
//                                            <LayoutGrid className="h-12 w-12 opacity-20 mb-3" />
//                                            <p>Variations will appear here</p>
//                                        </>
//                                    )}
//                                </div>
//                            )}
//                         </div>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>

//           {/* RIGHT: AGENT CONTROLS */}
//           <div className="lg:col-span-4 space-y-6">
            
//             {/* Analysis Report Card */}
//             {file && (
//               <div className={`p-5 rounded-xl border transition-all duration-500 ${analysisStatus === 'valid' ? 'bg-zinc-900/60 border-green-500/30' : analysisStatus === 'error' ? 'bg-red-900/10 border-red-500/30' : 'bg-zinc-900/30 border-zinc-800'}`}>
//                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                     <ScanEye className="h-4 w-4" /> Agent Verification
//                  </h3>
                 
//                  {analysisStatus === 'analyzing' && (
//                     <div className="space-y-3">
//                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
//                           <div className="h-full bg-indigo-500 w-2/3 animate-[shimmer_1s_infinite]"></div>
//                        </div>
//                        <p className="text-xs text-zinc-500">Checking for fashion items...</p>
//                     </div>
//                  )}

//                  {analysisStatus === 'valid' && analysisResult && (
//                     <div className="space-y-4 animate-in slide-in-from-top-2">
//                        <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
//                              <CheckCircle2 className="h-5 w-5 text-green-400" />
//                           </div>
//                           <div>
//                              <p className="text-white font-medium">{analysisResult.itemType} Confirmed</p>
//                              <p className="text-xs text-green-400">
//                                 Confidence: {(analysisResult.confidence * 100).toFixed(0)}%
//                              </p>
//                           </div>
//                        </div>
//                        <div className="p-3 bg-zinc-950/50 rounded-lg border border-zinc-800">
//                             <p className="text-xs text-zinc-400 italic">"{analysisResult.reasoning}"</p>
//                        </div>
//                     </div>
//                  )}
                 
//                  {analysisStatus === 'error' && (
//                      <div className="text-red-400 text-sm">
//                          System Error. Please try again.
//                      </div>
//                  )}
//               </div>
//             )}

//             {/* Prompting Controls */}
//             <div className={`space-y-6 transition-opacity duration-300 ${analysisStatus === 'valid' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
//                <div className="space-y-3">
//                   <Label className="text-indigo-100">Variation Prompt</Label>
//                   <p className="text-xs text-zinc-500">Describe the materials, colors, or patterns you want to apply to this specific shape.</p>
//                   <textarea 
//                     className="w-full h-32 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//                     placeholder="e.g. Change fabric to denim, add red stitching, make it look worn and vintage..."
//                     value={prompt}
//                     onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
//                   />
//                </div>

//                <Button 
//                   className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-900/20"
//                   onClick={handleRemix}
//                   disabled={isRemixing || !prompt}
//                >
//                   {isRemixing ? (
//                      <div className="flex items-center gap-2">
//                         <RefreshCw className="h-4 w-4 animate-spin" /> Generating 4 Variants...
//                      </div>
//                   ) : (
//                      <div className="flex items-center gap-2">
//                         <Wand2 className="h-4 w-4" /> Generate Variations
//                      </div>
//                   )}
//                </Button>
//             </div>
            
//             {!file && (
//                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
//                   <h4 className="text-sm font-medium text-white mb-2">Instructions</h4>
//                   <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4">
//                      <li>Upload a clear photo of the item.</li>
//                      <li>The Agent verifies it is a cloth item.</li>
//                      <li>Enter a text prompt for the design changes.</li>
//                      <li>We generate 4 variations strictly based on the original shape.</li>
//                   </ul>
//                </div>
//             )}

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




"use client";

import CartComponent from "@/app/components/Checkout/CheckoutComponent";

// Sample cart object that matches your Prisma schema
const sampleCart = {
  id: "cart_12345",
  createdAt: new Date("2024-01-15T10:30:00Z"),
  updatedAt: new Date("2024-01-15T10:30:00Z"),
  userId: "user_12345",
  customerId: null,
  address: "123 Main Street",
  billingAddress: "123 Main Street",
  billingCompanyName: null,
  billingEmail: "john@example.com",
  billingName: "John Doe",
  city: "New York",
  companyName: null,
  country: "USA",
  currency: "USD",
  deliveryMethod: "express",
  email: "john@example.com",
  firstName: "John",
  lastName: "Doe",
  paymentMethod: "credit_card",
  phone: "+1234567890",
  postalCode: "10001",
  step: "cart",
  subtotalPrice: 2598.00, // $2399 + $199
  totalPrice: 2805.84, // subtotal + shipping + tax
  items: [
    {
      id: "cart_item_1",
      quantity: 1,
      cartId: "cart_12345",
      variantId: "variant_1",
      createdAt: new Date("2024-01-15T10:30:00Z"),
      updatedAt: new Date("2024-01-15T10:30:00Z"),
      variant: {
        id: "variant_1",
        price: 2399.00,
        sku: "MBP16-M3-512",
        attributes: {
          size: "16-inch",
          color: "Space Gray",
          processor: "M3 Pro"
        },
        product: {
          id: "prod_1",
          name: "MacBook Pro 16-inch",
          brand: "Apple",
          description: "Apple M3 Pro chip with 16-core GPU, 16GB RAM, 512GB SSD",
          images: [],
          rating: 4.8,
          reviewCount: 342,
          isBestSeller: true,
          isNew: true,
          specifications: {
            "Processor": "M3 Pro",
            "RAM": "16GB",
            "Storage": "512GB SSD",
            "Display": "16-inch Liquid Retina XDR"
          }
        }
      }
    },
    {
      id: "cart_item_2",
      quantity: 1,
      cartId: "cart_12345",
      variantId: "variant_2",
      createdAt: new Date("2024-01-15T10:30:00Z"),
      updatedAt: new Date("2024-01-15T10:30:00Z"),
      variant: {
        id: "variant_2",
        price: 199.00,
        sku: "WH-1000XM5",
        attributes: {
          color: "Black",
          connectivity: "Wireless"
        },
        product: {
          id: "prod_2",
          name: "Sony WH-1000XM5 Wireless Headphones",
          brand: "Sony",
          description: "Industry-leading noise cancellation with 30-hour battery life",
          images: [],
          rating: 4.7,
          reviewCount: 1256,
          isBestSeller: true,
          isNew: false,
          specifications: {
            "Battery Life": "30 hours",
            "Noise Cancellation": "Active",
            "Bluetooth": "5.2"
          }
        }
      }
    }
  ]
} as const;

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CartComponent cart={sampleCart as any} />
    </div>
  );
}