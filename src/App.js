import { useEffect, useState } from "react";
import "./css/style.css"

function Form(props) {
  const {events, changeFilter}= props;
  
  ////重複しているイベント名は選択肢に入れない////
  const eventTitle = events.map((event) => {////イベントタイトルだけ取得（オブジェクト→配列）
    return (
      event.title
    );
  })
  const setTitle = new Set(eventTitle);//重複削除
  const optionTitle = Array.from(setTitle);//配列に戻す

  ////この関数が実行されたら、表示されるイベントが変わる////
  function handleSubmit(event) {
    event.preventDefault();//これがないと本当にリロードしちゃう
    const { selectedEvent } = event.target.elements;
    console.log(selectedEvent.value);//選択したイベントのタイトル取得確認できている
    props.changeFilter(selectedEvent.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="select_box">
        <select name="selectedEvent" defaultValue={events[0].title}>
        <option  key="all" value="all">全ての公演</option>
          {optionTitle.map((title) => {

            return (
              <option  key={title} value={title}>{title}</option>
            );
          })}
        </select>
      </div>
      <div className="select_btn">
        <button type="submit" className="button is-dark">
           Reload
        </button>
      </div>
    </form>
  );
}


function Header(props){
  const {events, changeFilter} = props;
  return(
    <header>
        <h1>簡易イベント表示</h1>
        <Form events={events} changeFilter={changeFilter}/>
    </header>
  );
}

function Event(props){
  return(
    <div key={props.id} className="event_block">
      <div className="num">
        <span>No.</span>
        <span>{props.id}</span>
      </div>
      <div className="date">
        <span>11</span>
        <span>/</span>
        <span>4</span>
      </div>{/* date */}
      <div className="time">
        <dl>
          <dt>open</dt>
          <dd>16:30</dd>
        </dl>
        <dl>
          <dt>start</dt>
          <dd>18:30</dd>
        </dl>
      </div>{/* date */}
      <div className="title">
        <h2><span>{props.title}</span></h2>
      </div>{/* title */}
      <div className="place">
        <p><span>{props.place}</span></p>
      </div>{/* place */}
    </div>
  );
}

function Main(props){
  const {events} = props;
  return(
    <main>
      <section className="event_section">
        <div className="main_width">
          <div className="event_group">
            
            {events.map((event) => {
              return (
                <Event id={event.id} title={event.title} place={event.place}/>
              );
            })}
          </div>{/* event_group */}
        </div>{/* main_width */}
      </section>
    </main>
  );
}

function App() {
  const events = [
    {id: 1, title: "鼓童ワン・アース・ツアー 童", place: "新潟県民会館"},
    {id: 2, title: "鼓童ワン・アース・ツアー 巡", place: "神奈川県民会館"},
    {id: 3, title: "鼓童ワン・アース・ツアー 鼓", place: "石川県民会館"},
    {id: 4, title: "鼓童ワン・アース・ツアー 打男", place: "埼玉県民会館"},
    {id: 5, title: "鼓童ワン・アース・ツアー 鼓", place: "福島県民会館"},
  ];

  ////公演名でのソート////

  const [filteredEvents, setFilteredEvents] = useState(events);
  let filterTitle = null;
  //const [filterTitle, setfilterTitle] = useState(null);
  //下の方が良いような気がするけど、結果がずれてしまう
  
  function settingFilterTitle(e) {
    return new Promise(function(resolve, reject) {
      filterTitle = e;
      resolve('成功');
    })
  }

  function changeFilter(e) {
    if(e == "all"){//全てを選ぶとき
      setFilteredEvents(events)
      return;//ここで関数を終わらせる（入れないと公演が表示されなくなる）
    }
    settingFilterTitle(e).then(
      function(f) {
        console.log(f);
        setFilteredEvents((events.filter(//実際のフィルタリング
          (event) => {
            return event.title == filterTitle;
          }
        )))
      }
    )
  }

  return (
    <div>
      <Header events = {events} changeFilter={changeFilter}/>
      <Main events = {filteredEvents} />
    </div>
  );
}

export default App;