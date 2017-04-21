/**
 * Created by xdj on 2017/4/21.
 */
import React from 'react';
import marked from 'marked';


import $ from 'jquery/dist/jquery.min';

const BASE_URL = "http://localhost:8080/JDoc/";

const style = {};

class ProjectContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markdownView: <div/>
    };
  }

  static propTypes = {
  };

  componentDidMount() {
    $.get(
      BASE_URL + "markdown.do",
      {
        id: 5,
      },
      result => {
        if(result.code===0){
          $("#markdown_div").html(marked(result.data.content));
        }else{
          this.setState({markdownView: <h3>内容不存在</h3>});
        }
      }
    )
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div id="markdown_div">{this.state.markdownView}</div>
    )
  };

}

export default ProjectContent;