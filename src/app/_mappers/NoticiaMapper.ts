import { NoticiaData } from '../_schema/NoticiaSchema'

export function criarNoticiaMapper(data: NoticiaData) {
  const mappedData = {
    titulo: data.titulo,
    conteudo: data.conteudo,
    url: data.url,
    dataPublicacao: data.dataPublicacao,
    foto: data.foto,
    categoria: data.categoriaCustomizada || data.categoria
  }

  Object.keys(mappedData).forEach((key) => {
    if (mappedData[key as keyof typeof mappedData] === '') {
      delete mappedData[key as keyof typeof mappedData]
    }
  })

  return mappedData
}
