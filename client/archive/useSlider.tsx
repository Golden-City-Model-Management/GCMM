
// import { useState, useCallback, useMemo, TouchEventHandler } from 'react'


// const useSlider = (data: any[]) => {

//   const slides = useMemo(() => data.map((datum: any, idx) => (idx)), [data])
//   const [currentActive, setCurrentActive] = useState(0)
//   const [swipePosition, setSwipePosition] = useState<{xDown: null | number, yDown: null | number, xDiff: null | number, yDiff: null | number}>({
//     xDown: null,
//     yDown: null,
//     xDiff: null, 
//     yDiff: null,
//   });

//   const goToNext = useCallback(() => {
//     if(currentActive === slides.length - 1){
//       setCurrentActive(0)
//     }else{
//       setCurrentActive(currentActive + 1)
//     }
//   }, [slides, currentActive])

//   const goToPrev = useCallback(() => {
//     if(currentActive === 0){
//       setCurrentActive(slides.length - 1)
//     }else{
//       setCurrentActive(currentActive - 1)
//     }
//   }, [slides, currentActive])


//   const  handleTouchStart = useCallback<TouchEventHandler>((e) => {
//       setSwipePosition(() => ({
//         xDown: e.touches[0].clientX,
//         yDown: e.touches[0].clientY,
//         xDiff: 0,
//         yDiff: 0,
//       }));
//     console.log(e.touches[0].clientX, e.touches[0].clientY)

//   }, [])

//   const handleTouchMove = useCallback<TouchEventHandler>((e) => {
//     if (swipePosition.xDown === null || swipePosition.yDown === null) {
//       return;
//     }
//     let xUp = e.touches[0].clientX;
//     let yUp = e.touches[0].clientY;
//     let xDiff = swipePosition.xDown - xUp;
//     let yDiff = swipePosition.yDown - yUp;
//     setSwipePosition((prev) => ({...prev, yDiff, xDiff}))

//     if (Math.abs(xDiff) > Math.abs(yDiff)){
//       if (xDiff > 0){
//         goToNext()
//       }else{
//         goToPrev()
//       }
//     }
//   }, [swipePosition, goToNext, goToPrev])

//   const handleTouchEnd = useCallback<TouchEventHandler>((e) => {
//     setSwipePosition({
//       xDown: null,
//       yDown: null,
//       xDiff: null,  
//       yDiff: null,
//     });
//   }, [])

//   return { 
//     goToNext,
//     goToPrev,
//     swipePosition,
//     handleTouchStart, handleTouchMove, handleTouchEnd, slides, currentActive
//   }
// }

// export default useSlider


// const handleSwipeStart = useCallback<TouchEventHandler>((e) => {
//   handleTouchStart(e)
// }, [])
// const handleSwipeMove = useCallback<TouchEventHandler>((e) => {
//   handleTouchMove(e)
//   if(swipePosition.xDiff === null) return
//   const move = swipePosition.xDiff 
//   if(Math.sign(move) === -1) {
//     console.log((Math.abs(move)/translate) * 100, 'neg')
//     !isLastItem && setTranslate(-(Math.abs(move)/translate) * 100)
//   }else{
//     console.log(move/translate, 'pos')
//     // setTranslate(prev => prev - move)
//   }
// }, [swipePosition, translate, !isLastItem, !isFirstItem])
// const handleSwipeEnd = useCallback<TouchEventHandler>((e) => {
//   handleTouchEnd(e)
// }, [])