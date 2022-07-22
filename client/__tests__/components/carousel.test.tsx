
import {  screen, renderWithSetup } from '../utils'
import Carousel from '@/components/common/Carousel'

const images = [
  {
    img: 'image 1 src',
    title: 'first image in carousel'
  },
  {
    img: 'image 2 src',
    title: 'second image in carousel'
  }
]

test('Carousel works correctly with clicks on previous and next button clicks', () => {
  const { user } = renderWithSetup(<Carousel images={images} />)
  const container = screen.getByTestId('carousel')
  const imageHolder = screen.getByAltText(images[0].title)
  const prevBtn = screen.getByTestId('previous-button')
  const nextBtn = screen.getByTestId('next-button')

  expect(container).toBeInTheDocument()
  expect(prevBtn).toBeInTheDocument()
  expect(nextBtn).toBeInTheDocument()
  expect(imageHolder).toHaveStyle({transform: 'translateX(0)'})

  user.click(nextBtn)
  expect(imageHolder).toHaveStyle({transform: 'translateX(-100%)'})
  expect(screen.getByAltText(images[1].title)).toHaveStyle({transform: 'translateX(-200%)'})

  user.click(prevBtn)
  expect(imageHolder).toHaveStyle({transform: 'translateX(0)'})
  expect(screen.getByAltText(images[1].title)).toHaveStyle({transform : 'translateX(-100%)'})
})