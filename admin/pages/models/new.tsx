
import ModelForm from '@/components/models/ModelForm'


const Models = () => {

  return (
    <>
     <ModelForm model={{
        name: 'elle', dob: '', height: 34, bust: 53, shoe: 34, hips: 34, waist: 34, cover_image: 'null',
        gender: 'female', id: 'lklkk', isActive: true, socials: {}
      }} submitBtnTxt='Submit Changes' handleSubmit={function (data){
        console.log(data)
      } } />
    </>
  )
}

export default Models