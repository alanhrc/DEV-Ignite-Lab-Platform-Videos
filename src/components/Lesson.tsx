import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface ILessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson({ title, slug, availableAt, type }: ILessonProps) {
  const { slug: slugParams } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt)
  const availableDateFormat = format(availableAt, "EEEE' • 'dd' de 'MMMM' • 'k'h'mm", { locale: ptBR })

  const isActiveLesson = slugParams === slug

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormat}
      </span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500': isActiveLesson
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('flex items-center gap-2 text-sm font-medium', {
              'text-blue-500': !isActiveLesson,
              'text-white': isActiveLesson,
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'VIDEO'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-gray-200': !isActiveLesson,
          'text-white': isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}
