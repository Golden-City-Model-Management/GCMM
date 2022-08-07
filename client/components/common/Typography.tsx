
import Typography, { TypographyProps } from '@mui/material/Typography'

interface ProseProps extends TypographyProps {
  text: string,
  sxProp?: object,
}
const Prose = ({ text, sxProp, ...otherProps }: ProseProps) => {

  return (
    <Typography
     {...otherProps}
      sx={{
        fontSize: '1.5rem',
        lineHeight: '1.5',
        maxWidth: '45ch',
        ...sxProp
      }}
    >{text}</Typography>
  )
}

export { Prose }