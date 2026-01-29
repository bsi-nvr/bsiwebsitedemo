"use client"

export function ContactMap() {
  return (
    <section className="border-t border-border">
      <div className="relative w-full h-[450px] md:h-[600px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.88272178228!2d4.764317877592597!3d52.62596342837766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf5762e19df105%3A0x9bc1d80b97342e6e!2sBrainsoft%20ICT!5e0!3m2!1snl!2snl!4v1769454637869!5m2!1snl!2snl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Brainsoft ICT Location"
        />
      </div>
    </section>
  )
}
