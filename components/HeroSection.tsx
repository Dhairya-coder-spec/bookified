// 'use client';
// import Image from "next/image"
// import Link from "next/link"
// import { Plus } from "@phosphor-icons/react"

// const steps = [
//   { title: "Upload PDF", description: "Add your book file" },
//   { title: "AI Processing", description: "We analyze the content" },
//   { title: "Voice Chat", description: "Discuss with AI" },
// ]

// const HeroSection = () => {
//   return (
//     <section
//       aria-labelledby="library-hero-title"
//       className="mx-auto w-full max-w-[1000px] "
//     >
//       <div className="library-hero-card min-h-[260px]">
//         <div className="library-hero-content">
//           <div className="library-hero-text">
//             <h1 id="library-hero-title" className="library-hero-title">
//               Your Library
//             </h1>
//             <p className="library-hero-description">
//               Convert your books into interactive AI conversations. Listen,
//               learn, and discuss your favorite reads.
//             </p>
//             <Link href="/books/new" className="library-cta-primary">
//               <Plus size={20} weight="bold" aria-hidden="true" />
//               Add new book
//             </Link>
//           </div>

//           <div className="flex w-full max-w-[270px] flex-1 items-center justify-center">
//             <Image
//               src="/assets/hero-illustration.png"
//               alt="Vintage books, an open book, a globe, and a reading lamp"
//               width={500}
//               height={350}
//               priority
//               className="h-auto w-full object-contain"
//             />
//           </div>

//           <ol className="library-steps-card flex w-full flex-col gap-3 lg:w-[200px] lg:shrink-0">
//             {steps.map(({ title, description }, index) => (
//               <li className="library-step-item" key={title}>
//                 <span className="library-step-number" aria-hidden="true">
//                   {index + 1}
//                 </span>
//                 <div>
//                   <h2 className="library-step-title">{title}</h2>
//                   <p className="library-step-description">{description}</p>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default HeroSection


import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="wrapper mb-10 md:mb-16">
      <div className="library-hero-card">
        <div className="library-hero-content">
          {/* Left Part */}
          <div className="library-hero-text">
            <h1 className="library-hero-title text-4xl font-serif font-bold">Your Library</h1>
            <p className="library-hero-description">
              Convert your books into interactive AI conversations. <br className="hidden md:block" />
              Listen, learn, and discuss your favorite reads.
            </p>
            <Link href="/books/new" className="library-cta-primary mt-4 flex items-center justify-center">
              <span className="text-3xl font-light mb-1 mr-2">+</span>
              <span className="text-[#212a3b]">Add new book</span>
            </Link>
          </div>

          {/* Center Part - Desktop */}
          <div className="library-hero-illustration-desktop">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and a globe"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Center Part - Mobile (Hidden on Desktop) */}
          <div className="library-hero-illustration">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and a globe"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          {/* Right Part */}
          <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
            <ul className="space-y-6">
              <li className="library-step-item">
                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">1</div>
                <div className="flex flex-col">
                  <h3 className="library-step-title text-lg font-bold">Upload PDF</h3>
                  <p className="library-step-description text-gray-500">Add your book file</p>
                </div>
              </li>
              <li className="library-step-item">
                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">2</div>
                <div className="flex flex-col">
                  <h3 className="library-step-title text-lg font-bold">AI Processing</h3>
                  <p className="library-step-description text-gray-500">We analyze the content</p>
                </div>
              </li>
              <li className="library-step-item">
                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-300 flex items-center justify-center font-medium text-lg">3</div>
                <div className="flex flex-col">
                  <h3 className="library-step-title text-lg font-bold">Voice Chat</h3>
                  <p className="library-step-description text-gray-500">Discuss with AI</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

