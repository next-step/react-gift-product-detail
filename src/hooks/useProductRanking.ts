import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Product } from '@/types/product'
import { useSuspenseQuery } from '@tanstack/react-query'

const genderOptions = ['전체', '여성이', '남성이', '청소년이']
const topicOptions = ['받고 싶어한', '많이 선물한', '위시로 받은']

const genderMap: Record<string, string> = {
  전체: 'ALL',
  여성이: 'FEMALE',
  남성이: 'MALE',
  청소년이: 'TEEN',
}

const topicMap: Record<string, string> = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
}

const fetchRanking = async (gender: string, topic: string) => {
  const targetType = genderMap[gender]
  const rankType = topicMap[topic]
  const response = await axios.get<{ data: Product[] }>(
    `${import.meta.env.VITE_API_BASE_URL}/api/products/ranking`,
    {
      params: { targetType, rankType },
    }
  )
  return response.data.data
}

export function useProductRanking() {
  const [selectedGender, setSelectedGender] = useState('전체')
  const [selectedTopic, setSelectedTopic] = useState('받고 싶어한')

  useEffect(() => {
    const savedGender = localStorage.getItem('selectedGender')
    const savedTopic = localStorage.getItem('selectedTopic')
    if (savedGender && genderOptions.includes(savedGender)) {
      setSelectedGender(savedGender)
    }
    if (savedTopic && topicOptions.includes(savedTopic)) {
      setSelectedTopic(savedTopic)
    }
  }, [])

  const { data: products = [] } = useSuspenseQuery({
    queryKey: ['productRanking', selectedGender, selectedTopic],
    queryFn: () => fetchRanking(selectedGender, selectedTopic),
  })

  const selectGender = (option: string) => {
    setSelectedGender(option)
    localStorage.setItem('selectedGender', option)
  }

  const selectTopic = (option: string) => {
    setSelectedTopic(option)
    localStorage.setItem('selectedTopic', option)
  }

  return {
    products,
    selectedGender,
    selectedTopic,
    selectGender,
    selectTopic,
  }
}
