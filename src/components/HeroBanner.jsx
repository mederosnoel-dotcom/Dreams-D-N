import React from 'react'
import { Sparkles, ShieldCheck, Award, Truck, ChevronRight } from 'lucide-react'

export const HeroBanner = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#131622] via-[#0d0f17] to-[#090a0f] border-b border-[#232733]/50">
      {/* Background Ambience Moonlight Silver Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-10 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Content Column */}
        <div className="md:col-span-7 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-600/50 text-slate-200 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            <span className="tracking-widest uppercase">Colección Exclusiva de Plata</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-4">
            El resplandor de tus sueños, <br className="hidden sm:inline" />
            forjado en <span className="silver-gradient-text italic font-serif">Plata Fina</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto md:mx-0 leading-relaxed mb-6 font-light">
            En <strong className="text-white font-medium">DREAMS D&N</strong> creamos joyas exclusivas en auténtica <strong className="text-white font-medium">Plata Fina</strong>. Cada sortija, cadena, dije y pulsera combina el fulgor de la plata con circones brillantes y acabados de alta orfebrería.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full silver-gradient-bg text-[#090a0f] font-semibold text-sm tracking-wider uppercase transition-all shadow-lg shadow-white/10 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Ver Catálogo de Plata</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/573000000000?text=Hola%20DREAMS%20D%26N,%20deseo%20asesor%C3%ADa%20para%20joyer%C3%ADa%20en%20plata."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-700 bg-white/5 text-slate-200 hover:text-white hover:border-slate-400 text-sm font-medium transition-all text-center"
            >
              Asesoría por WhatsApp
            </a>
          </div>

          {/* Trust Value Badges (Plata Fina) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 pt-6 border-t border-[#232733]/70 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#181b26] border border-slate-600/40 flex items-center justify-center text-slate-200 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-semibold text-white">Plata Fina</h4>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Pureza y brillo sellados</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#181b26] border border-slate-600/40 flex items-center justify-center text-slate-200 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-semibold text-white">Garantía Vitalicia</h4>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Mantenimiento de brillo</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#181b26] border border-slate-600/40 flex items-center justify-center text-slate-200 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-semibold text-white">Envío Asegurado</h4>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Entrega blindada 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Hero Image Gallery Showcase (Silver Ring) */}
        <div className="md:col-span-5 relative">
          <div className="relative mx-auto max-w-xs sm:max-w-sm">
            {/* Elegant Outer Border Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-600/40 shadow-2xl shadow-black/80">
              <img
                src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=85"
                alt="Sortija en Plata DREAMS D&N"
                className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              
              {/* Floating Pill on image */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#11131c]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">Joyería Fina</span>
                  <h3 className="text-xs font-medium text-white">Joyería Fina de Plata</h3>
                </div>
                <span className="text-xs font-bold text-slate-200">DREAMS D&N</span>
              </div>
            </div>

            {/* Accent Floating Card */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-[#171a26] border border-slate-600/40 p-3 rounded-xl shadow-xl items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Auténtica Plata</p>
                <p className="text-[10px] text-slate-400">Calidad garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
