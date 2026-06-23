import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Github } from "lucide-react"
import { getGithubContributions } from "@/lib/github-contributions"

const LEVEL_COLORS = [
  "bg-muted",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-300",
]

const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

const WEEKDAY_LABELS_PT = ["", "Seg", "", "Qua", "", "Sex", ""]

export async function GithubContributionsCard() {
  const { total, days } = await getGithubContributions()

  if (days.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Github className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Não foi possível carregar as contribuições do GitHub.</p>
        </CardContent>
      </Card>
    )
  }

  const weeks: typeof days[] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const monthLabels = weeks
    .map((week, index) => {
      const firstDayOfMonth = week.find((day) => new Date(day.date).getDate() === 1)
      if (!firstDayOfMonth) return null
      return { index, label: MONTHS_PT[new Date(firstDayOfMonth.date).getMonth()] }
    })
    .filter((month): month is { index: number; label: string } => month !== null)

  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm font-medium flex items-center gap-2">
          <Github className="h-4 w-4" />
          {total} contribuições no último ano
        </p>
      </CardHeader>
      <CardContent>
        {/* Below lg (notebook): fixed-size cells in a horizontally scrollable track */}
        <div className="overflow-x-auto lg:hidden">
          <div className="inline-flex flex-col gap-1 min-w-max">
            <div className="relative h-4 ml-8">
              {monthLabels.map(({ index, label }) => (
                <span
                  key={index}
                  className="absolute text-[10px] text-muted-foreground"
                  style={{ left: `${index * 16}px` }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              <div className="flex flex-col gap-1 mr-1 w-6 shrink-0 text-[10px] leading-3 text-muted-foreground">
                {WEEKDAY_LABELS_PT.map((label, index) => (
                  <span key={index} className="h-3">
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.count} contribuições em ${day.date}`}
                        className={`h-3 w-3 rounded-sm ${LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* lg and up (notebook/desktop): fluid grid that always fits the card width */}
        <div className="hidden lg:block w-full">
          <div className="relative h-4 ml-[26px]">
            {monthLabels.map(({ index, label }) => (
              <span
                key={index}
                className="absolute text-[10px] text-muted-foreground"
                style={{ left: `${(index / weeks.length) * 100}%` }}
              >
                {label}
              </span>
            ))}
          </div>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `24px repeat(${weeks.length}, minmax(0, 1fr))`,
              gridTemplateRows: "repeat(7, minmax(0, 1fr))",
            }}
          >
            {WEEKDAY_LABELS_PT.map((label, dayIndex) => (
              <span
                key={`label-${dayIndex}`}
                className="flex items-center text-[10px] leading-none text-muted-foreground"
                style={{ gridColumn: 1, gridRow: dayIndex + 1 }}
              >
                {label}
              </span>
            ))}
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={day.date}
                  title={`${day.count} contribuições em ${day.date}`}
                  className={`aspect-square rounded-sm ${LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0]}`}
                  style={{ gridColumn: weekIndex + 2, gridRow: dayIndex + 1 }}
                />
              )),
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground mt-2">
          <span>Menos</span>
          {LEVEL_COLORS.map((color) => (
            <div key={color} className={`h-3 w-3 rounded-sm ${color}`} />
          ))}
          <span>Mais</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function GithubContributionsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-28 w-full" />
      </CardContent>
    </Card>
  )
}
