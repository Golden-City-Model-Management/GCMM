

const Mapper = ({ list, ComponentItem, mapKey, itemProps, itemName}:{
  list: any[],
  ComponentItem: any,
  mapKey: string,
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
                key={item[mapKey]} 
                {...componentProps(item)} />
            )
          })
        }
        </>
    );
}

export default Mapper