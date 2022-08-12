

const Mapper = ({ list, ComponentItem, key, itemProps, itemName}:{
  list: any[],
  ComponentItem: any,
  key: string,
  itemProps: any,
  itemName: string,
}) => {

  const componentProps = (val: any) => ({
    ...itemProps, [itemName]: val
  })
    return (
        <>
        {
          list.map((item: any) => {
            return (
              <ComponentItem 
                key={item[key]} 
                {...componentProps(item)} />
            )
          })
        }
        </>
    );
}

export default Mapper