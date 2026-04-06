import { Topbar } from "@/components/layout/topbar"
import { SectionHeader } from "@/components/dashboard/section-header"
import { TeamMemberCard } from "@/components/team/team-member-card"
import { teamMembers } from "@/lib/data"

/**
 * This part of the code renders the Team page. It shows a grid of team
 * member cards, each displaying the member's identity, role, and three
 * key operational metrics. When there are no team members it shows an
 * empty-state message.
 */
export default function TeamPage() {
  return (
    <>
      <Topbar title="Team" subtitle="DecisionOS" />

      <div className="space-y-6 p-6">
        <SectionHeader title="Team Members" />

        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} {...member} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
            No team members configured
          </div>
        )}
      </div>
    </>
  )
}
