

import Bg1 from '@/public/assets/images/BG-01.jpg'
import Bg2 from '@/public/assets/images/BG-02.jpg'
import Bg3 from '@/public/assets/images/BG-03.jpg'
import Bg5 from '@/public/assets/images/BG-05.jpg'
import Bg6 from '@/public/assets/images/BG-06.jpg'
import Bg7 from '@/public/assets/images/BG-07.jpg'

import {  screen, renderWithSetup } from '../utils'
import Carousel from '@/components/common/Carousel'

const images = [ {img: Bg1, title: 'bg1'}, {img: Bg2, title: 'bg2'}, {img: Bg3, title: 'bg3'}, {img: Bg5, title: 'bg5'}, {img: Bg6, title: 'bg6'}, {img: Bg7, title: 'bg7'},]


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