"use client"

import { Mail, Phone } from "lucide-react"

export interface TeamMember {
  name: string
  role: string
  bio: string
  email: string
  phone: string
}

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <div 
      className="group border border-border overflow-hidden hover:border-foreground/30 transition-colors animate-on-scroll"
      style={{ transitionDelay: `${(index + 1) * 100}ms` }}
    >
      {/* Photo Placeholder */}
      <div className="aspect-[3/4] bg-secondary/30 flex items-end justify-start p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-7xl md:text-8xl font-serif font-light text-muted-foreground/20 relative z-10">
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-serif font-light">
          {member.name}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {member.role}
        </p>

        {/* Bio */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-pretty">
          {member.bio}
        </p>

        {/* Contact Details - Icons Only */}
        <div className="mt-6 pt-6 border-t border-border flex items-center gap-4">
          <a
            href={`mailto:${member.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-1"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-1"
            aria-label={`Call ${member.name}`}
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
