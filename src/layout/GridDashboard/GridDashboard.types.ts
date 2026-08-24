import type{ KpiCardProps } from "../../components/Card/types/Card.types"

export const kpiCards: KpiCardProps[] = [
  {
    title: 'Receita',
    value: 'R$ 128,4 mil',
    description: 'Total consolidado no periodo atual.',
    trend: 'up',
    trendLabel: '12,5%',
  },
  {
    title: 'Usuarios ativos',
    value: '8.742',
    description: 'Usuarios com atividade registrada.',
    trend: 'up',
    trendLabel: '8,2%',
  },
  {
    title: 'Conversao',
    value: '24,8%',
    description: 'Taxa media das oportunidades.',
    trend: 'down',
    trendLabel: '1,4%',
  },
  {
    title: 'Tickets abertos',
    value: '36',
    description: 'Pendencias aguardando atendimento.',
    trend: 'neutral',
    trendLabel: 'estavel',
  },
]
