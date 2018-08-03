import React, { Component } from 'react';








export class List extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      completeList:[],
      deleteList:[],
      statusCompliteComponent:false,
      statusDeleteComponent:false,
      time:[],
      timeDel:[]
    };
  }

  componentDidMount() {
    localStorage.getItem("localstate") &&
      this.setState(
        JSON.parse(localStorage.getItem("localstate"))
      );
  }

  componentDidUpdate() {
    localStorage.setItem(
      "localstate",
      JSON.stringify(this.state)
    );
  }

  updateData = (value,value2) => {
    this.setState({ completeList:[...this.state.completeList,[value]] ,
    
      statusCompliteComponent:true,
      time:[...this.state.time,[value2]]
    })
  }

  updateDeleteDate = (value,value2) => {
    this.setState({ deleteList:[...this.state.deleteList,[value]] ,
    
      statusDeleteComponent:true,
      timeDel:[...this.state.timeDel,[value2]]
    })
  }

  onClear = () => {
    this.setState({
      completeList:[],
      deleteList:[],
      statusCompliteComponent:false,
      statusDeleteComponent:false,
      time:[],
      timeDel:[]
      
    })

  }

  
  render() {

    

    return (
        <div className='parent_toDo'>
            <div className='App__todolist'>
            <p className='head-status-text'>Текущие : </p>
            
        {
    this.props.full.map((item,index) =>(<MiniCom key={index} itemMass={item} updateData={this.updateData} updateDeleteDate={this.updateDeleteDate}/> 
     ))}
          </div>
        <div className='toDo__status'>
          <p className='head-status-text'>История: </p>
          <button className='clear histor' onClick={this.onClear}><p>&#10006;</p><p>Очистить историю</p></button>
      <div className='complete'>
     {
     <CompleteCom  name={this.state.completeList} statusComponent={this.state.statusCompliteComponent} date={this.state.time}/> 
      }
     </div> 

     <div className='delete'>
     {
     <DeleteCom  name={this.state.deleteList} statusComponent={this.state.statusDeleteComponent} date={this.state.timeDel}/> 
      }
     </div>
     </div>
</div>
);
        
  }
}

 class MiniCom extends Component {
  constructor(props) {
    super(props);
    this.state= {
      delete:false,
      complete:false,
      nameQuest:'',
      status:'',
    
    }
    
  }
  deleteComp = (event) => {
    let today = new Date()
    let nowToday=(today.getFullYear() + '-' + (today.getMonth() +1) + '-' + today.getDate()+ ' ' +today.getHours()+ ':' +today.getMinutes()+ ':' +today.getSeconds());
    this.props.updateDeleteDate(this.props.itemMass[0],nowToday);
    this.setState({status:true, delete:true});
  }

  updateChildrenState = (event) => {
     let today = new Date()
      let nowToday=(today.getFullYear() + '-' + (today.getMonth() +1) + '-' + today.getDate()+ ' ' +today.getHours()+ ':' +today.getMinutes()+ ':' +today.getSeconds());
    this.props.updateData(this.props.itemMass[0],nowToday);
    

    this.setState({status:true, complete:true},
     );
    
  }




  render() {
    



    if (this.state.complete) {
      return (<div className='hiddenDiv__complete'><div className='complete_p'>{this.props.itemMass[0]} <div className='completeImg'/></div> </div>)
    }
    if (this.state.delete) {
      return (<div className='hiddenDiv__delete'><div className='delete_p'>{this.props.itemMass[0]} <div className='deleteImg'/></div></div>)
    }
    
    return (
      <div className='toDoList'>
    
    
      
         
             
              <p className='headerName'>{this.props.itemMass[0]}</p>
              <p className='dateName'>Выполнить до: {this.props.itemMass[1]}</p>
              <div className='input_block'>
            <div  className='butt_ok' onClick={this.updateChildrenState}><p>&#10004;</p></div>
            <div className='butt_del' onClick={this.deleteComp}><p>&#10006;</p></div>
              </div>
           
            
            

      </div>
      
    );
  }
}

class CompleteCom extends Component {


  



  render() {
    if (this.props.statusComponent) {
      return(
      this.props.name.map((item,index) =>(<p className='compl-del-text' key={index}> <span>Задача</span> {item} <span className='comp-span'>Выполнена </span><span className='comp-span dater'> Дата выполнения: {this.props.date[index]}</span></p>))
     
      )
    }

    return (<div className='hiddenDiv'></div>)
    
    

    
  }

}

class DeleteCom extends Component {
 
    
  
  render() {
    if (this.props.statusComponent) {
      
      return (
        this.props.name.map((item,index) =>(<p className='compl-del-text' key={index}> <span>Задача</span> {item} <span className='not_comp-span'>Не выполнена</span> <span className='not_comp-span dater'> Дата отмены задачи: {this.props.date[index]}</span></p>))
      
    
    )
    }
  

    return (<div className='hiddenDiv'></div>)
    
    

    
  }

}


export default List;