'use client'

import { ComentariosFiltros } from '@/app/_components/comentarios-filtros'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/_components/ui/avatar'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/app/_components/ui/tooltip'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { ComentarioResponseDTO } from '@/app/_dtos/response'
import { useComentarioFilters } from '@/app/_hooks/useComentarioFilters'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import {
  EyeIcon,
  EyeOffIcon,
  MessageSquareIcon,
  StarIcon,
  ThumbsUpIcon,
  UserIcon
} from 'lucide-react'
import Link from 'next/link'
import { ComentarioActionsMenu } from './comentario-actions-menu'

interface ProfissionalComentariosListProps {
  comentarios: ComentarioResponseDTO[]
  profissionalId: string
}

export function ProfissionalComentariosList({
  comentarios,
  profissionalId
}: ProfissionalComentariosListProps) {
  const {
    filtros,
    comentariosFiltrados,
    setVisibilidade,
    setNotaMinima,
    setOrdemNota,
    setOrdemData,
    limparFiltros,
    temFiltrosAtivos,
    contadorFiltrosAtivos
  } = useComentarioFilters(comentarios)

  if (comentarios.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareIcon className="size-5" aria-hidden="true" />
            Comentários
          </CardTitle>
          <CardDescription>
            Este profissional ainda não possui comentários.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <ComentariosFiltros
        visibilidade={filtros.visibilidade}
        notaMinima={filtros.notaMinima}
        ordemNota={filtros.ordemNota}
        ordemData={filtros.ordemData}
        onVisibilidadeChange={setVisibilidade}
        onNotaMinimaChange={setNotaMinima}
        onOrdemNotaChange={setOrdemNota}
        onOrdemDataChange={setOrdemData}
        onLimparFiltros={limparFiltros}
        temFiltrosAtivos={temFiltrosAtivos}
        contadorFiltrosAtivos={contadorFiltrosAtivos}
        totalComentarios={comentarios.length}
        totalFiltrados={comentariosFiltrados.length}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareIcon className="size-5" aria-hidden="true" />
            Comentários
            {temFiltrosAtivos && (
              <Badge variant="secondary">
                {comentariosFiltrados.length} de {comentarios.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Avaliações e comentários sobre este profissional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {comentariosFiltrados.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center text-sm">
              Nenhum comentário encontrado com os filtros aplicados.
            </div>
          ) : (
            comentariosFiltrados.map((comentario) => (
              <div
                key={comentario.id}
                className="border-border rounded-lg border p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={comentario.autor.fotoUrl ?? undefined}
                        alt={`Foto de ${comentario.autor.nome}`}
                      />
                      <AvatarFallback>
                        {comentario.autor.nome.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{comentario.autor.nome}</p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={
                                comentario.visivel ? 'default' : 'secondary'
                              }
                              className="flex items-center gap-1"
                            >
                              {comentario.visivel ? (
                                <EyeIcon
                                  className="size-3"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EyeOffIcon
                                  className="size-3"
                                  aria-hidden="true"
                                />
                              )}
                              {comentario.visivel ? 'Visível' : 'Oculto'}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            {comentario.visivel
                              ? 'Este comentário está visível para os usuários no aplicativo'
                              : 'Este comentário está oculto e não aparece no aplicativo'}
                          </TooltipContent>
                        </Tooltip>
                        {comentario.autor.id && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            asChild
                          >
                            <Link
                              href={APP_ROUTES.USUARIO_DETALHE(
                                comentario.autor.id
                              )}
                              aria-label={`Ver perfil de ${comentario.autor.nome}`}
                            >
                              <UserIcon className="size-3" aria-hidden="true" />
                              Ver perfil
                            </Link>
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`size-4 ${
                              index < comentario.nota
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                        <span className="text-muted-foreground ml-2 text-sm">
                          {comentario.nota.toFixed(1)} estrelas
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                        {comentario.conteudo}
                      </p>

                      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                        <span>
                          {formatDateToDateString(
                            comentario.criadoEm.toString()
                          )}
                        </span>
                        {comentario.totalLikes > 0 && (
                          <span className="flex items-center gap-1">
                            <ThumbsUpIcon
                              className="size-3"
                              aria-hidden="true"
                            />
                            {comentario.totalLikes}{' '}
                            {comentario.totalLikes === 1
                              ? 'curtida'
                              : 'curtidas'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ComentarioActionsMenu
                    comentario={comentario}
                    profissionalId={profissionalId}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
