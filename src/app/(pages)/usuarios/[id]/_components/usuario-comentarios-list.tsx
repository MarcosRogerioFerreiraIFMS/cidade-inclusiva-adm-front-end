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
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  MessageSquareIcon,
  StarIcon,
  ThumbsUpIcon
} from 'lucide-react'
import Link from 'next/link'
import { ComentarioActionsMenu } from './comentario-actions-menu'

interface ComentarioDestino {
  href: string
  label: string
  tipo: string
}

function getComentarioDestino(
  comentario: ComentarioResponseDTO
): ComentarioDestino | null {
  if (comentario.profissionalId) {
    return {
      href: APP_ROUTES.PROFISSIONAL_DETALHE(comentario.profissionalId),
      label: 'Ver profissional',
      tipo: 'Profissional'
    }
  }

  if (comentario.motoristaId) {
    return {
      href: APP_ROUTES.MOTORISTA_DETALHE(comentario.motoristaId),
      label: 'Ver motorista',
      tipo: 'Motorista'
    }
  }

  if (comentario.manutencaoId) {
    return {
      href: APP_ROUTES.MANUTENCAO_DETALHE(comentario.manutencaoId),
      label: 'Ver oficina de manutenção',
      tipo: 'Oficina de Manutenção'
    }
  }

  if (comentario.acessibilidadeUrbanaId) {
    return {
      href: APP_ROUTES.ACESSIBILIDADE_URBANA_DETALHE(
        comentario.acessibilidadeUrbanaId
      ),
      label: 'Ver acessibilidade urbana',
      tipo: 'Acessibilidade Urbana'
    }
  }

  return null
}

interface UsuarioComentariosListProps {
  comentarios: ComentarioResponseDTO[]
  usuarioId: string
}

export function UsuarioComentariosList({
  comentarios,
  usuarioId
}: UsuarioComentariosListProps) {
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
            Este usuário ainda não possui comentários.
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
            Avaliações e comentários feitos por este usuário
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {comentariosFiltrados.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center text-sm">
              Nenhum comentário encontrado com os filtros aplicados.
            </div>
          ) : (
            comentariosFiltrados.map((comentario) => {
              const destino = getComentarioDestino(comentario)

              return (
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
                          <p className="font-semibold">
                            {comentario.autor.nome}
                          </p>
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
                          {destino && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  asChild
                                >
                                  <Link
                                    href={destino.href}
                                    aria-label={destino.label}
                                  >
                                    <ArrowRightIcon
                                      className="size-3"
                                      aria-hidden="true"
                                    />
                                    {destino.label}
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Comentário sobre {destino.tipo}
                              </TooltipContent>
                            </Tooltip>
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
                      usuarioId={usuarioId}
                    />
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
