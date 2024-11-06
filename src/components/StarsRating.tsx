import { useState } from 'react'
import Star from './Star'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}

const starsContainerStyle = {
  display: 'flex',
}

type Props = {
  maxRating?: number
  color?: string
  size?: number
  defaultRating?: number
  onSetRating: (rating: number) => void
}

const StarsRating = ({
  maxRating = 5,
  color = '#fcc419',
  size = 36,
  defaultRating = 0,
  onSetRating,
}: Props) => {
  const [rating, setRating] = useState(defaultRating)
  const [tempRating, setTempRating] = useState(0)

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size}px`,
  }

  const handleRating = (i: number) => {
    onSetRating(i)
    setRating(i)
  }

  const onHoverIn = (i: number) => {
    setTempRating(i)
  }
  const onHoverOut = () => {
    setTempRating(0)
  }

  return (
    <div style={containerStyle}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onMouseEnter={() => onHoverIn(i + 1)}
            onMouseLeave={() => onHoverOut()}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ''}</p>
    </div>
  )
}

export default StarsRating
