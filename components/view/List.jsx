import {List} from 'antd';
import {FolderOutlined,DownloadOutlined} from '@ant-design/icons';
import Video from '../../static/video.svg';
import Link from 'next/link';
import {memo} from 'react';


const ItemLink =memo(({data,next})=>{

    // const queryString = `/drive/root:/${data.name}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime`

    console.log(data)
    let item
    if(data.folder){
        item =  ( <List.Item.Meta 
        // title={<Link href={queryString}><a>{data.name}</a></Link>}
        title={<a href="#" onClick={next.bind(this,data.name)}>{data.name}</a>}
        description={data.lastModifiedDateTime.slice(0,10)}
        
        >
        </List.Item.Meta>)
    }else{
        item = (
            <List.Item.Meta 
        title={<Link href={{pathname:"/video" ,query:{url:data["@microsoft.graph.downloadUrl"]}}}><a>{data.name}</a></Link>}
        description={data.lastModifiedDateTime.slice(0,10)}
        
        >
        </List.Item.Meta>)
    }

    return item

// return (data.folder?((<><FolderOutlined style={{paddingRight:'10px'}}/> <Link href={queryString}><a>{data.name}</a></Link></>)):
// <a href={data["@microsoft.graph.downloadUrl"]}>{data.name}</a>
//         )
})

function MyList({repos,next}){
    

    return(
            <List

            itemLayout="horizontal"
            dataSource={repos}
            renderItem={(item,index) => (
            <List.Item key={index}>
                
            { item.folder? <FolderOutlined style={{paddingRight:'10px'}}/> :<div style={{paddingRight:'10px'}}><Video /></div>}
                <ItemLink data={item} next={next}/> 
            {item.folder?<span style={{paddingRight:'20px'}}></span>: <span style={{paddingRight:'20px'}}>{Math.floor(item.size/1024/1024)} MB</span>} 
                <DownloadOutlined />
            </List.Item>
            )}
            extra={
                <DownloadOutlined />
            }
            />
    
    )
}


export default MyList;