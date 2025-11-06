/**
 * Tipos de usuários aceitos pelo backend
 * ATENÇÃO: Ao modificar esses tipos, verifique se estão sincronizados com o backend!
 */
export const TIPO_USUARIO = ['ADMIN', 'USUARIO'] as const

/**
 * Enum com os valores de tipo de usuário
 * Facilita o acesso aos valores sem magic strings
 */
export const TipoUsuarioEnum = {
  ADMIN: 'ADMIN',
  USUARIO: 'USUARIO'
} as const

/**
 * Type para tipo de usuário
 */
export type TipoUsuario = (typeof TIPO_USUARIO)[number]

/**
 * Mapeamento dos tipos para exibição amigável no frontend
 */
export const TipoUsuarioDisplay: Record<TipoUsuario, string> = {
  ADMIN: 'Administrador',
  USUARIO: 'Usuário'
}

/**
 * Mapeamento dos tipos para variantes de Badge do Shadcn/UI
 */
export const TipoUsuarioBadgeVariant: Record<
  TipoUsuario,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  ADMIN: 'destructive',
  USUARIO: 'default'
}

/**
 * Mapeamento dos tipos para descrições
 */
export const TipoUsuarioDescricao: Record<TipoUsuario, string> = {
  ADMIN: 'Administradores têm acesso total ao sistema',
  USUARIO: 'Usuários comuns com acesso limitado'
}

/**
 * Opções para uso em Select/Dropdown
 */
export const TipoUsuarioOptions = [
  {
    value: TipoUsuarioEnum.USUARIO,
    label: TipoUsuarioDisplay.USUARIO,
    description: TipoUsuarioDescricao.USUARIO
  },
  {
    value: TipoUsuarioEnum.ADMIN,
    label: TipoUsuarioDisplay.ADMIN,
    description: TipoUsuarioDescricao.ADMIN
  }
] as const

/**
 * Verifica se um valor é um tipo de usuário válido
 */
export function isTipoUsuarioValido(valor: unknown): valor is TipoUsuario {
  return (
    typeof valor === 'string' && TIPO_USUARIO.includes(valor as TipoUsuario)
  )
}

/**
 * Verifica se um tipo de usuário é administrador
 */
export function isAdmin(tipo: TipoUsuario): boolean {
  return tipo === TipoUsuarioEnum.ADMIN
}

/**
 * Verifica se um tipo de usuário é usuário comum
 */
export function isUsuarioComum(tipo: TipoUsuario): boolean {
  return tipo === TipoUsuarioEnum.USUARIO
}

/**
 * Retorna o label de exibição para um tipo de usuário
 */
export function getTipoUsuarioLabel(tipo: TipoUsuario): string {
  return TipoUsuarioDisplay[tipo] ?? 'Desconhecido'
}

/**
 * Retorna a variante de Badge para um tipo de usuário
 */
export function getTipoUsuarioBadgeVariant(
  tipo: TipoUsuario
): 'default' | 'secondary' | 'destructive' | 'outline' {
  return TipoUsuarioBadgeVariant[tipo] ?? 'default'
}

/**
 * Retorna a descrição para um tipo de usuário
 */
export function getTipoUsuarioDescricao(tipo: TipoUsuario): string {
  return TipoUsuarioDescricao[tipo] ?? ''
}
