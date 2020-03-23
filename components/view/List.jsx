import {List} from 'antd';
import {FolderOutlined} from '@ant-design/icons';
import Video from '../../static/video.svg';
import Link from 'next/link';
import {memo} from 'react';


const ItemLink =memo(({data})=>{

    const queryString = `/root:/${data.name}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime`
    // console.log(data)
    // console.log(data)
    return(
        <List.Item.Meta 
        title={<Link href={queryString}><a>{data.name}</a></Link>}
        description={data.lastModifiedDateTime.slice(0,10)}
        />
    )

// return (data.folder?((<><FolderOutlined style={{paddingRight:'10px'}}/> <Link href={queryString}><a>{data.name}</a></Link></>)):
// <a href={data["@microsoft.graph.downloadUrl"]}>{data.name}</a>
//         )
})

function MyList({repos}){
    

    return(
            <List

            itemLayout="horizontal"
            dataSource={repos}
            renderItem={item => (
            <List.Item>
                
            { item.folder? <FolderOutlined style={{paddingRight:'10px'}}/> :<div style={{paddingRight:'10px'}}><Video /></div>}
                <ItemLink data={item}/>
              
               
            </List.Item>
            )}
            />
    
    )
}


export default MyList;