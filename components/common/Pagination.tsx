import { useState ,useEffect} from "react"




interface PaginationProps {
    perPage:number
    itemSize:number
    currentPage:number
    setCurrentPage: (arg: number|((arg:any)=>any)) => void
    

}

const Pagination: React.FC<PaginationProps> = ({perPage, itemSize,currentPage,setCurrentPage}) => {
    const [maxPage, setMaxPage] = useState(0);
    useEffect(()=>{
    const maxPage=(itemSize-itemSize%perPage)/perPage+(itemSize%perPage==0 ? 0:1);
    },[perPage, itemSize])
   
    const handlePage=(p:number)=>{
        if ( p==-1&&currentPage-1>0){
          setCurrentPage(pre=>pre-1);
        } else
        if ( p==0&&currentPage+1<=maxPage){
          setCurrentPage(pre=>pre+1);
        }
        else{
    
          setCurrentPage(p);
    
        }
      }

return(
<div className='flex justify-center'>
<button className={`${currentPage-1<1? 'disabled':''} p-5`}
onClick={()=>{
  handlePage(-1);
}}
  >&laquo;</button>
<button className={`${''} p-5`}
onClick={()=>{
  handlePage(1);
}}
  >1</button>

<button className={`${''} p-5`}
onClick={()=>{
  handlePage(4);
}}
  >4</button>
<button className={`${currentPage+1>maxPage ? 'disabled':''} p-5`}
  onClick={()=>{
    handlePage(0);
  }}
>&raquo;</button>
</div>
)
}

export default Pagination