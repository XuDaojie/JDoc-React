/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ProjectItem extends React.Component {
  render() {
    return (
      <Card style={{width: 500, marginBottom: 16}}>
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
          <img src="images/test1.png" />
        </CardMedia>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  };

}

export default ProjectItem;