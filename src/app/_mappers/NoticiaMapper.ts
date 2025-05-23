import { NoticiaCategories } from '../_constants/NoticiaCategories'
import { NoticiaData } from '../_schema/NoticiaSchema'

export function criarNoticiaMapper(data: NoticiaData): NoticiaData {
  const mappedData = {
    titulo: data.titulo,
    conteudo: data.conteudo,
    url: data.url,
    dataPublicacao: data.dataPublicacao,
    foto: data.foto,
    categoria:
      data.categoria == 'Outro' && data.categoriaCustomizada
        ? data.categoriaCustomizada
        : data.categoria
  }

  Object.keys(mappedData).forEach((key) => {
    if (mappedData[key as keyof typeof mappedData] === '') {
      delete mappedData[key as keyof typeof mappedData]
    }
  })

  return mappedData
}

export function atualizarNoticiaMapper(data: NoticiaData): NoticiaData {
  return criarNoticiaMapper(data)
}

export function prepararDadosParaEdicao(data: NoticiaData): NoticiaData {
  const categoriaCustomizada = !NoticiaCategories.includes(data.categoria)
    ? data.categoria
    : ''

  return {
    ...data,
    categoria: NoticiaCategories.includes(data.categoria)
      ? data.categoria
      : 'Outro',
    categoriaCustomizada: categoriaCustomizada
  }
}
