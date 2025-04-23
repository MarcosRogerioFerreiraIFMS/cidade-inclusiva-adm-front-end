interface InfoCardProps {
  title: string
  description: string
  value: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
export function InfoCard({
  title,
  description,
  value,
  icon: Icon
}: InfoCardProps) {
  return (
    <article className="outline-primary flex w-full flex-col gap-6 rounded-lg p-5 outline-2 outline-offset-[-2px]">
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="text-primary w-full truncate text-xl">{title}</h2>
          <Icon className="text-primary shrink-0" />
        </div>

        <div className="text-muted-foreground text-lg">{description}</div>
      </div>

      <div className="text-lg font-bold">{value}</div>
    </article>
  )
}
