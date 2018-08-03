
import React, { Component } from 'react';
import './App.css';
import List from './List';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameQuest: '',
      nameDate:'',
      full:[],
      childrenState:'',
      nonDate:' Дата не выбрана '
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

  onChange = (event) => {
    this.setState({ nameQuest: event.target.value});
  }

  onChangeData = (event) => {
    this.setState({ nameDate: event.target.value});
  }

  onClick = (event) => {
    event.preventDefault();

    if(this.state.nameQuest==='' ){
      alert('Введите задачу')
    }
    else if (this.state.nameDate===''){
      this.setState({
        nameQuest: '',
        nameDate:'',
      
        full:[...this.state.full,[this.state.nameQuest,this.state.nonDate]]
      });
    }
    else {

    this.setState({
      nameQuest: '',
      nameDate:'',
    
      full:[...this.state.full,[this.state.nameQuest,this.state.nameDate]]
    });
  } 
  }

  onClear = () => {
    this.setState({
      nameQuest: '',
      nameDate:'',
      full:[],
      childrenState:''
    })

  }

  

  render() {

    
    
    return (
      
      <main>
        <div className="App" onSubmit={this.onClick}>
      
        <div className='App__inputBlock'>
            <div className='App__input'>
          <label><p>Введите задачу: </p>
          <input id="check1" value={this.state.nameQuest} onChange={this.onChange} />
          </label>
            </div>
            <div className='App__input'>
          <label><p>Введите дату выполнения: </p>
          <input id="check2" value={this.state.nameDate} onChange={this.onChangeData} type='date'/>
          </label>
          </div>
          <button className='add' onClick={this.onClick}><p>&#10010;</p><p>Добавить</p></button>
          </div>
          <button className='clear' onClick={this.onClear}><p>&#10006;</p><p>Очистить задачи</p></button>
          
          <List full={this.state.full} />
          <div className='background_react'><div className='back'></div></div> 
        </div>
        
        
      </main>
    );
  }
}
    


// export default App;
