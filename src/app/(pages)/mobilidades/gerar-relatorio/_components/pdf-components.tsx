/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { Button } from '@/app/_components/ui/button'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import type { MobilidadeStatus } from '@/app/_enums/mobilidadeEnums'
import { getMobilidadeStatusLabel } from '@/app/_enums/mobilidadeEnums'
import type { MobilidadeRelatorioFilterDTO } from '@/app/_schemas/mobilidadeRelatorioSchema'
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DownloadIcon, Loader2Icon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

// Registrar fontes apenas uma vez
if (typeof window !== 'undefined') {
  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
        fontWeight: 300
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
        fontWeight: 400
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
        fontWeight: 500
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
        fontWeight: 700
      }
    ]
  })
}

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 50,
    paddingBottom: 70,
    fontFamily: 'Roboto'
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2pt solid #2563eb'
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: 400,
    lineHeight: 1.4
  },
  filterSection: {
    marginBottom: 25,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderLeft: '4pt solid #3b82f6'
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#0c4a6e',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  filterText: {
    fontSize: 10,
    color: '#0369a1',
    marginBottom: 6,
    lineHeight: 1.5
  },
  summarySection: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
    border: '1.5pt solid #e4e4e7'
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#101010',
    marginBottom: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  summaryGrid: {
    flexDirection: 'column',
    gap: 12
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12
  },
  summaryCard: {
    flex: 1,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    border: '1pt solid #e4e4e7'
  },
  summaryCardTitle: {
    fontSize: 9,
    color: '#101010',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: 600
  },
  summaryCardValue: {
    fontSize: 24,
    fontWeight: 700,
    color: '#101010'
  },
  chartsSection: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
    border: '1.5pt solid #cbd5e1'
  },
  chartCard: {
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    border: '1pt solid #e4e4e7'
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  chartBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chartLabel: {
    fontSize: 10,
    width: '28%',
    color: '#334155',
    fontWeight: 600
  },
  chartBarContainer: {
    flex: 1,
    height: 24,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative'
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 6
  },
  chartValue: {
    fontSize: 11,
    marginLeft: 8,
    color: '#0f172a',
    fontWeight: 700,
    minWidth: 38
  },
  tableSection: {
    marginTop: 35
  },
  tableSectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  table: {
    border: '1pt solid #cbd5e1',
    borderRadius: 8,
    overflow: 'hidden'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e40af',
    padding: 14,
    fontWeight: 700,
    color: '#FFFFFF',
    fontSize: 10,
    minHeight: 40
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e2e8f0',
    padding: 14,
    fontSize: 9,
    backgroundColor: '#FFFFFF',
    minHeight: 55
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e2e8f0',
    backgroundColor: '#f8fafc',
    padding: 14,
    fontSize: 9,
    minHeight: 55
  },
  colDescricao: {
    width: '54%',
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colStatus: {
    width: '16%',
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colData: {
    width: '14%',
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colLocalizacao: {
    width: '16%'
  },
  coordText: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 6,
    lineHeight: 1.3
  },
  mapsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f5',
    padding: '6 12',
    borderRadius: 4,
    marginTop: 4
  },
  mapsLinkText: {
    fontSize: 9,
    color: '#0f172a',
    marginLeft: 4,
    fontWeight: 600
  },
  statusBadge: {
    padding: '5 10',
    borderRadius: 6,
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center'
  },
  statusPendente: {
    backgroundColor: '#fecaca',
    color: '#7f1d1d'
  },
  statusEmAndamento: {
    backgroundColor: '#bfdbfe',
    color: '#1e3a8a'
  },
  statusConcluido: {
    backgroundColor: '#bbf7d0',
    color: '#14532d'
  },
  statusCancelado: {
    backgroundColor: '#e2e8f0',
    color: '#334155'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#94a3b8',
    borderTop: '1pt solid #cbd5e1',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 9,
    color: '#64748b'
  },
  pageNumber: {
    fontSize: 9,
    color: '#64748b'
  }
})

interface PDFDocumentProps {
  mobilidades: MobilidadeResponseDTO[]
  filters?: MobilidadeRelatorioFilterDTO
}

// Componente do documento PDF
function MobilidadePDFDocument({ mobilidades, filters }: PDFDocumentProps) {
  const dataGeracao = format(new Date(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR
  })

  const totalOcorrencias = mobilidades.length
  const statusCount = mobilidades.reduce(
    (acc, m) => {
      acc[m.status] = (acc[m.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const getStatusColor = (status: string) => {
    const colors = {
      PENDENTE: '#dc2626',
      EM_ANDAMENTO: '#2563eb',
      CONCLUIDO: '#16a34a',
      CANCELADO: '#64748b'
    }
    return colors[status as keyof typeof colors] || '#64748b'
  }

  const getStatusStyle = (status: string) => {
    const statusStyles = {
      PENDENTE: styles.statusPendente,
      EM_ANDAMENTO: styles.statusEmAndamento,
      CONCLUIDO: styles.statusConcluido,
      CANCELADO: styles.statusCancelado
    }
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      styles.statusCancelado
    )
  }

  // Verificar se há qualquer filtro aplicado
  const hasAnyFilter = !!(
    (filters?.status && filters.status.length > 0) ||
    filters?.dataInicio ||
    filters?.dataFim ||
    filters?.usuarioNome
  )

  // Se tiver qualquer filtro, quebra o resumo para outra página
  const hasMultipleFilters = hasAnyFilter

  return (
    <Document>
      {/* PÁGINA 1 - CABEÇALHO E FILTROS */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Relatório de Ocorrências de Mobilidade
          </Text>
          <Text style={styles.subtitle}>
            Gerado em {dataGeracao} - Sistema Cidade Inclusiva
          </Text>
        </View>

        {/* Filtros Aplicados */}
        {(filters?.status ||
          filters?.dataInicio ||
          filters?.dataFim ||
          filters?.usuarioNome) && (
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Filtros Aplicados</Text>
            {filters.status && filters.status.length > 0 && (
              <Text style={styles.filterText}>
                Status:{' '}
                {filters.status
                  .map((s) => getMobilidadeStatusLabel(s as MobilidadeStatus))
                  .join(', ')}
              </Text>
            )}
            {filters.dataInicio && (
              <Text style={styles.filterText}>
                Data Início: {format(filters.dataInicio, 'dd/MM/yyyy')}
              </Text>
            )}
            {filters.dataFim && (
              <Text style={styles.filterText}>
                Data Fim: {format(filters.dataFim, 'dd/MM/yyyy')}
              </Text>
            )}
            {filters.usuarioNome && (
              <Text style={styles.filterText}>
                Usuário: {filters.usuarioNome}
              </Text>
            )}
          </View>
        )}

        {/* Resumo Estatístico - Somente se poucos filtros */}
        {!hasMultipleFilters && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Resumo Geral</Text>
            <View style={styles.summaryGrid}>
              {/* Primeira linha - Total */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryCardTitle}>
                    Total de Ocorrências
                  </Text>
                  <Text style={styles.summaryCardValue}>
                    {totalOcorrencias}
                  </Text>
                </View>
              </View>

              {/* Segunda linha - Status em pares */}
              <View style={styles.summaryRow}>
                {Object.entries(statusCount)
                  .slice(0, 2)
                  .map(([status, count]) => (
                    <View key={status} style={styles.summaryCard}>
                      <Text style={styles.summaryCardTitle}>
                        {getMobilidadeStatusLabel(status as MobilidadeStatus)}
                      </Text>
                      <Text style={styles.summaryCardValue}>
                        {count} ({((count / totalOcorrencias) * 100).toFixed(0)}
                        %)
                      </Text>
                    </View>
                  ))}
              </View>

              {/* Terceira linha - Demais status */}
              {Object.entries(statusCount).length > 2 && (
                <View style={styles.summaryRow}>
                  {Object.entries(statusCount)
                    .slice(2)
                    .map(([status, count]) => (
                      <View key={status} style={styles.summaryCard}>
                        <Text style={styles.summaryCardTitle}>
                          {getMobilidadeStatusLabel(status as MobilidadeStatus)}
                        </Text>
                        <Text style={styles.summaryCardValue}>
                          {count} (
                          {((count / totalOcorrencias) * 100).toFixed(0)}%)
                        </Text>
                      </View>
                    ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Rodapé */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Relatório gerado pelo Sistema Cidade Inclusiva
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>

      {/* PÁGINA EXTRA - RESUMO GERAL (se muitos filtros) */}
      {hasMultipleFilters && (
        <Page size="A4" orientation="landscape" style={styles.page}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>Resumo Geral</Text>
            <Text style={styles.subtitle}>
              Visão geral das {totalOcorrencias} ocorrências
            </Text>
          </View>

          {/* Resumo Estatístico */}
          <View style={styles.summarySection}>
            <View style={styles.summaryGrid}>
              {/* Primeira linha - Total */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryCardTitle}>
                    Total de Ocorrências
                  </Text>
                  <Text style={styles.summaryCardValue}>
                    {totalOcorrencias}
                  </Text>
                </View>
              </View>

              {/* Segunda linha - Status em pares */}
              <View style={styles.summaryRow}>
                {Object.entries(statusCount)
                  .slice(0, 2)
                  .map(([status, count]) => (
                    <View key={status} style={styles.summaryCard}>
                      <Text style={styles.summaryCardTitle}>
                        {getMobilidadeStatusLabel(status as MobilidadeStatus)}
                      </Text>
                      <Text style={styles.summaryCardValue}>
                        {count} ({((count / totalOcorrencias) * 100).toFixed(0)}
                        %)
                      </Text>
                    </View>
                  ))}
              </View>

              {/* Terceira linha - Demais status */}
              {Object.entries(statusCount).length > 2 && (
                <View style={styles.summaryRow}>
                  {Object.entries(statusCount)
                    .slice(2)
                    .map(([status, count]) => (
                      <View key={status} style={styles.summaryCard}>
                        <Text style={styles.summaryCardTitle}>
                          {getMobilidadeStatusLabel(status as MobilidadeStatus)}
                        </Text>
                        <Text style={styles.summaryCardValue}>
                          {count} (
                          {((count / totalOcorrencias) * 100).toFixed(0)}%)
                        </Text>
                      </View>
                    ))}
                </View>
              )}
            </View>
          </View>

          {/* Rodapé */}
          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>
              Relatório gerado pelo Sistema Cidade Inclusiva
            </Text>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Página ${pageNumber} de ${totalPages}`
              }
            />
          </View>
        </Page>
      )}

      {/* PÁGINA 2 - DISTRIBUIÇÃO POR STATUS */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Distribuição por Status</Text>
          <Text style={styles.subtitle}>Análise visual das ocorrências</Text>
        </View>

        {/* Gráficos */}
        <View style={styles.chartsSection}>
          <View style={styles.chartCard}>
            {Object.entries(statusCount)
              .sort(([, a], [, b]) => b - a)
              .map(([status, count], index, array) => {
                const percentage = (count / totalOcorrencias) * 100
                const color = getStatusColor(status)
                const isLast = index === array.length - 1
                return (
                  <View key={status}>
                    <View style={styles.chartBar}>
                      <Text style={styles.chartLabel}>
                        {getMobilidadeStatusLabel(status as MobilidadeStatus)}
                      </Text>
                      <View style={styles.chartBarContainer}>
                        <View
                          style={[
                            styles.chartBarFill,
                            { width: `${percentage}%`, backgroundColor: color }
                          ]}
                        />
                      </View>
                      <Text style={styles.chartValue}>{count}</Text>
                    </View>
                    {!isLast && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#e2e8f0',
                          marginVertical: 12
                        }}
                      />
                    )}
                  </View>
                )
              })}
          </View>
        </View>

        {/* Rodapé */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Relatório gerado pelo Sistema Cidade Inclusiva
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>

      {/* PÁGINA 3+ - TABELA DE DADOS */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Ocorrências Detalhadas</Text>
          <Text style={styles.subtitle}>
            Lista completa de {totalOcorrencias} ocorrências
          </Text>
        </View>

        {/* Tabela de Dados */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDescricao}>DESCRIÇÃO</Text>
            <Text style={styles.colStatus}>STATUS</Text>
            <Text style={styles.colData}>DATA</Text>
            <Text style={styles.colLocalizacao}>LOCALIZAÇÃO</Text>
          </View>

          {mobilidades.map((mobilidade, index) => {
            const mapsUrl = `https://www.google.com/maps?q=${mobilidade.latitude},${mobilidade.longitude}`

            return (
              <View
                key={mobilidade.id}
                style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                wrap={false}
              >
                <View style={styles.colDescricao}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: '#1e293b',
                      lineHeight: 1.4
                    }}
                  >
                    {mobilidade.descricao.substring(0, 100)}
                    {mobilidade.descricao.length > 100 ? '...' : ''}
                  </Text>
                </View>
                <View style={styles.colStatus}>
                  <Text
                    style={[
                      styles.statusBadge,
                      getStatusStyle(mobilidade.status)
                    ]}
                  >
                    {getMobilidadeStatusLabel(mobilidade.status)}
                  </Text>
                </View>
                <View style={styles.colData}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: '#475569',
                      fontWeight: 500
                    }}
                  >
                    {format(new Date(mobilidade.dataRegistro), 'dd/MM/yyyy')}
                  </Text>
                </View>
                <View style={styles.colLocalizacao}>
                  <Text style={styles.coordText}>
                    Lat: {mobilidade.latitude.toFixed(6)}
                    {'\n'}
                    Lng: {mobilidade.longitude.toFixed(6)}
                  </Text>
                  <Link src={mapsUrl} style={{ textDecoration: 'none' }}>
                    <View style={styles.mapsLink}>
                      <Image
                        src="https://img.icons8.com/?size=256&id=DcygmpZqBEd9&format=png"
                        style={{ width: 18, height: 18 }}
                      />
                      <Text style={styles.mapsLinkText}>Ver Mapa</Text>
                    </View>
                  </Link>
                </View>
              </View>
            )
          })}
        </View>

        {/* Rodapé */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Relatório gerado pelo Sistema Cidade Inclusiva
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}

// Componente de visualização do PDF
export function PDFViewerComponent({ mobilidades, filters }: PDFDocumentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cria uma key única baseada nos dados para forçar re-render
  const pdfKey = useMemo(() => {
    const mobilidadesIds = mobilidades.map((m) => m.id).join('-')
    const filtersString = JSON.stringify(filters)
    return `${mobilidadesIds}-${filtersString}`
  }, [mobilidades, filters])

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Carregando visualizador PDF...</p>
      </div>
    )
  }

  return (
    <PDFViewer
      key={pdfKey}
      style={{
        width: '100%',
        height: 'calc(100vh - 22rem)',
        border: 'none'
      }}
    >
      <MobilidadePDFDocument mobilidades={mobilidades} filters={filters} />
    </PDFViewer>
  )
}

// Componente de download do PDF
export function PDFDownloadButton({ mobilidades, filters }: PDFDocumentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cria uma key única baseada nos dados para forçar re-render
  const pdfKey = useMemo(() => {
    const mobilidadesIds = mobilidades.map((m) => m.id).join('-')
    const filtersString = JSON.stringify(filters)
    return `${mobilidadesIds}-${filtersString}`
  }, [mobilidades, filters])

  if (!mounted) {
    return (
      <Button disabled>
        <Loader2Icon className="animate-spin" />
        <span>Carregando...</span>
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      key={pdfKey}
      document={
        <MobilidadePDFDocument mobilidades={mobilidades} filters={filters} />
      }
      fileName={`relatorio-mobilidade-${new Date().getTime()}.pdf`}
    >
      {({ loading }: { loading: boolean }) => (
        <Button disabled={loading}>
          {loading && <Loader2Icon className="animate-spin" />}
          {!loading && <DownloadIcon />}
          <span>{loading ? 'Gerando...' : 'Baixar PDF'}</span>
        </Button>
      )}
    </PDFDownloadLink>
  )
}
