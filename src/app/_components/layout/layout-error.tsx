import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangleIcon,
  BanIcon,
  ClockIcon,
  FileQuestionIcon,
  LightbulbIcon,
  LockIcon,
  RefreshCcwIcon,
  SearchXIcon,
  ServerCrashIcon,
  Undo2Icon,
  WifiOffIcon
} from 'lucide-react'
import Link from 'next/link'
import { APP_ROUTES } from '../../_constants/appSettingsConstants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import { Alert, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { LayoutDashboard } from './layout-dashboard'

interface LayoutErrorProps {
  /** Erro capturado */
  error?: Error & { digest?: string }
  /** Função para resetar o estado de erro */
  reset?: () => void
}

type ErrorType =
  | 'network'
  | 'timeout'
  | 'auth'
  | 'permission'
  | 'notfound'
  | 'ratelimit'
  | 'server'
  | 'validation'
  | 'unknown'

interface ErrorInfo {
  title: string
  message: string
  cause: string
  icon: LucideIcon
  action?: string
}

/**
 * Identifica o tipo de erro baseado na mensagem
 */
function identifyErrorType(error?: Error): ErrorType {
  if (!error?.message) return 'unknown'

  const message = error.message.toLowerCase()

  if (
    message.includes('fetch failed') ||
    message.includes('failed to fetch') ||
    message.includes('network') ||
    message.includes('conexão')
  ) {
    return 'network'
  }

  if (
    message.includes('timeout') ||
    message.includes('demorou') ||
    message.includes('tempo de requisição esgotado') ||
    message.includes('tempo de resposta') ||
    message.includes('408') ||
    message.includes('504')
  ) {
    return 'timeout'
  }

  if (
    message.includes('não autenticado') ||
    message.includes('unauthorized') ||
    message.includes('401') ||
    message.includes('token') ||
    message.includes('sessão expirou') ||
    message.includes('nao autorizado') ||
    message.includes('faça login novamente')
  ) {
    return 'auth'
  }

  if (
    message.includes('forbidden') ||
    message.includes('403') ||
    message.includes('permissão') ||
    message.includes('acesso negado')
  ) {
    return 'permission'
  }

  if (
    message.includes('not found') ||
    message.includes('404') ||
    message.includes('não encontrado') ||
    message.includes('nao encontrado') ||
    message.includes('não existe') ||
    message.includes('nao existe') ||
    message.includes('rota não encontrada') ||
    message.includes('rota nao encontrada') ||
    message.includes('route not found')
  ) {
    return 'notfound'
  }

  if (
    message.includes('429') ||
    message.includes('too many') ||
    message.includes('rate limit') ||
    message.includes('muitas requisições') ||
    message.includes('muitas requisicoes') ||
    message.includes('muitas operações') ||
    message.includes('muitas operacoes') ||
    message.includes('tente novamente em')
  ) {
    return 'ratelimit'
  }

  if (
    message.includes('500') ||
    message.includes('502') ||
    message.includes('503') ||
    message.includes('server error') ||
    message.includes('internal') ||
    message.includes('servidor') ||
    message.includes('erro no servidor') ||
    message.includes('serviço temporariamente indisponível') ||
    message.includes('servico temporariamente indisponivel')
  ) {
    return 'server'
  }

  if (
    message.includes('inválido') ||
    message.includes('invalido') ||
    message.includes('validação') ||
    message.includes('validacao') ||
    message.includes('validation') ||
    message.includes('400') ||
    message.includes('requisição inválida') ||
    message.includes('requisicao invalida') ||
    message.includes('bad request')
  ) {
    return 'validation'
  }

  return 'unknown'
}

/**
 * Obter informações detalhadas do erro
 */
function getErrorInfo(error?: Error): ErrorInfo {
  const errorType = identifyErrorType(error)

  const errorMap: Record<ErrorType, ErrorInfo> = {
    network: {
      title: 'Erro de Conexão',
      message:
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
      cause:
        '• Sua internet pode estar instável ou desconectada\n• O servidor pode estar temporariamente offline\n• Um firewall ou bloqueador pode estar impedindo a conexão',
      icon: WifiOffIcon,
      action: 'Verifique sua conexão e tente novamente'
    },
    timeout: {
      title: 'Tempo Esgotado',
      message: 'A requisição demorou muito para responder. Tente novamente.',
      cause:
        '• A conexão com a internet está muito lenta\n• O servidor está demorando para responder\n• Há muitas requisições sendo processadas ao mesmo tempo',
      icon: ClockIcon,
      action: 'Aguarde alguns segundos e tente novamente'
    },
    auth: {
      title: 'Sessão Expirada',
      message: 'Sua sessão expirou. Por favor, faça login novamente.',
      cause:
        '• Sua sessão de login expirou após período de inatividade\n• O token de autenticação foi invalidado\n• Você pode ter feito logout em outra aba',
      icon: LockIcon,
      action: 'Faça login novamente para continuar'
    },
    permission: {
      title: 'Acesso Negado',
      message: 'Você não tem permissão para acessar este recurso.',
      cause:
        '• Seu usuário não tem permissão para acessar este recurso\n• As permissões da sua conta foram alteradas\n• Você está tentando acessar uma área restrita',
      icon: BanIcon,
      action: 'Entre em contato com o administrador'
    },
    notfound: {
      title: 'Não Encontrado',
      message: 'O recurso solicitado não foi encontrado.',
      cause:
        '• O item foi removido ou não existe mais\n• O link que você usou está desatualizado ou incorreto\n• Houve um erro ao carregar a página',
      icon: SearchXIcon,
      action: 'Volte para a página inicial'
    },
    ratelimit: {
      title: 'Limite de Requisições Excedido',
      message:
        error?.message ||
        'Muitas operações foram realizadas. Aguarde alguns minutos antes de tentar novamente.',
      cause:
        '• Você realizou muitas operações em um curto período de tempo\n• O sistema está limitando requisições para proteção\n• O tempo de espera varia conforme o tipo de operação',
      icon: ClockIcon,
      action: 'Aguarde e tente novamente em alguns minutos'
    },
    server: {
      title: 'Erro no Servidor',
      message:
        'O servidor está com problemas no momento. Tente novamente em alguns instantes.',
      cause:
        '• O servidor está enfrentando problemas técnicos\n• Há uma manutenção em andamento\n• Um erro inesperado ocorreu no processamento dos dados\n• O servidor pode estar sobrecarregado',
      icon: ServerCrashIcon,
      action: 'Aguarde alguns minutos e tente novamente'
    },
    validation: {
      title: 'Dados Inválidos',
      message: 'Os dados enviados são inválidos. Verifique e tente novamente.',
      cause:
        '• Algum campo foi preenchido incorretamente\n• Dados obrigatórios estão faltando\n• O formato dos dados não é válido',
      icon: FileQuestionIcon,
      action: 'Verifique os dados e tente novamente'
    },
    unknown: {
      title: 'Algo Deu Errado',
      message: error?.message || 'Ocorreu um problema inesperado.',
      cause:
        '• Um problema temporário no sistema\n• Dados inválidos ou corrompidos\n• Tente recarregar a página ou fazer login novamente',
      icon: AlertTriangleIcon,
      action: 'Tente novamente ou recarregue a página'
    }
  }

  return errorMap[errorType]
}

export function LayoutError({ error, reset }: LayoutErrorProps) {
  const errorInfo = getErrorInfo(error)
  const IconComponent = errorInfo.icon

  return (
    <LayoutDashboard>
      <div
        className="flex h-full items-center justify-center gap-2 px-4"
        role="alert"
        aria-live="assertive"
      >
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-10">
          {/* Ícone e Título */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="text-destructive" aria-hidden="true">
              <IconComponent className="h-20 w-20" strokeWidth={1.5} />
            </div>
            <h2 className="text-destructive text-3xl font-bold">
              {errorInfo.title}
            </h2>
          </div>

          {/* Mensagem Principal */}
          <Alert variant="destructive" className="w-full">
            <AlertTitle className="text-center text-base">
              {errorInfo.message}
            </AlertTitle>
          </Alert>

          {/* Ação Sugerida */}
          {errorInfo.action && (
            <p className="text-muted-foreground flex items-center gap-2 text-center text-sm">
              <LightbulbIcon className="h-4 w-4 shrink-0" />
              {errorInfo.action}
            </p>
          )}

          {/* Accordion com Detalhes Técnicos */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="technical-details" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-muted-foreground text-sm">
                  Ver possíveis causas
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted text-muted-foreground mt-2 rounded-md px-4 py-3 text-left text-sm">
                  <p className="mb-2 font-medium">Possíveis causas:</p>
                  <p className="whitespace-pre-line">{errorInfo.cause}</p>
                </div>

                <div className="bg-muted text-muted-foreground mt-3 rounded-md px-4 py-3 text-left">
                  <p className="mb-2 text-xs font-medium text-orange-600 uppercase">
                    Detalhes Técnicos
                  </p>
                  {error?.message && (
                    <p className="mb-1 text-xs">
                      <span className="font-medium">Mensagem:</span>{' '}
                      {error.message}
                    </p>
                  )}
                  {error?.digest && (
                    <p className="text-xs">
                      <span className="font-medium">ID:</span> {error.digest}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Botões de Ação */}
          <div className="flex gap-3">
            {reset && (
              <Button onClick={reset}>
                <RefreshCcwIcon />
                <span>Tentar Novamente</span>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href={APP_ROUTES.HOME}>
                <Undo2Icon />
                <span>Ir para Início</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  )
}
