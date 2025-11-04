'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EyeIcon,
  XIcon
} from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { Input } from '@/app/_components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table'
import { useEffect, useMemo, useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  pageSize?: number
  actions?: React.ReactNode
  enableColumnVisibility?: boolean
  defaultHiddenColumns?: string[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Pesquisar...',
  pageSize = 10,
  actions,
  enableColumnVisibility = false,
  defaultHiddenColumns = []
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const initialVisibility: VisibilityState = {}
      defaultHiddenColumns.forEach((columnId) => {
        initialVisibility[columnId] = false
      })
      return initialVisibility
    }
  )
  const [animationKey, setAnimationKey] = useState(0)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()

  const paginationInfo = useMemo(() => {
    const startRow = pageIndex * currentPageSize + 1
    const endRow = Math.min((pageIndex + 1) * currentPageSize, totalRows)

    return {
      startRow,
      endRow,
      totalRows,
      hasResults: totalRows > 0
    }
  }, [pageIndex, currentPageSize, totalRows])

  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [pageIndex])

  const visibleColumnsCount = table
    .getAllColumns()
    .filter((col) => col.getIsVisible()).length
  const toggleableColumns = table
    .getAllColumns()
    .filter((col) => col.getCanHide())

  return (
    <div className="w-full space-y-4">
      {(searchKey || enableColumnVisibility || actions) && (
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex w-full max-w-sm items-center gap-2">
            {searchKey && (
              <>
                <Input
                  placeholder={searchPlaceholder}
                  value={
                    (table.getColumn(searchKey)?.getFilterValue() as string) ??
                    ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(searchKey)
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                  aria-label={searchPlaceholder}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    table.getColumn(searchKey)?.setFilterValue('')
                  }}
                  aria-label="Limpar pesquisa"
                >
                  <XIcon aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {enableColumnVisibility && toggleableColumns.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2"
                    aria-label="Selecionar colunas"
                  >
                    <EyeIcon className="size-4" aria-hidden="true" />
                    Colunas ({visibleColumnsCount})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Selecionar colunas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {toggleableColumns.map((column) => {
                    const columnId = column.id
                    const columnHeader =
                      typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : columnId

                    return (
                      <DropdownMenuCheckboxItem
                        key={columnId}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        aria-label={`${column.getIsVisible() ? 'Ocultar' : 'Exibir'} coluna ${columnHeader}`}
                      >
                        {columnHeader}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody key={animationKey}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="animate-fade-in hover:bg-muted/50 transition-colors duration-200"
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="animate-fade-in">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground text-sm transition-opacity duration-300">
          {paginationInfo.hasResults ? (
            <>
              Mostrando {paginationInfo.startRow} até {paginationInfo.endRow} de{' '}
              {paginationInfo.totalRows}{' '}
              {paginationInfo.totalRows === 1 ? 'resultado' : 'resultados'}
            </>
          ) : (
            'Nenhum resultado'
          )}
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium whitespace-nowrap">
              Linhas por página
            </p>
            <Select
              value={`${currentPageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue placeholder={currentPageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 50, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">
              Página {pageIndex + 1} de {pageCount}
            </span>
            {pageCount > 1 && (
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-sm">|</span>
                <span className="text-muted-foreground text-sm whitespace-nowrap">
                  Ir para:
                </span>
                <Input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    if (page >= 0 && page < pageCount) {
                      table.setPageIndex(page)
                    }
                  }}
                  onBlur={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    if (page < 0) {
                      table.setPageIndex(0)
                    } else if (page >= pageCount) {
                      table.setPageIndex(pageCount - 1)
                    }
                  }}
                  className="h-8 w-[60px] text-center"
                  aria-label={`Ir para página específica (1 a ${pageCount})`}
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 transition-all duration-200 hover:scale-105 active:scale-95 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Ir para primeira página"
            >
              <ChevronsLeftIcon aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Ir para página anterior"
            >
              <ChevronLeftIcon aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Ir para próxima página"
            >
              <ChevronRightIcon aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 transition-all duration-200 hover:scale-105 active:scale-95 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Ir para última página"
            >
              <ChevronsRightIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
