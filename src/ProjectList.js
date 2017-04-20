/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  gridList: {
    width: 2000,
    // height: 450,
    // overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'images/test1.png',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/test2.png',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/test3.png',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/test4.png',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/test2.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/test6.png',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/test7.png',
    title: 'Morning',
    author: 'fancycrave1',
  },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const ProjectList = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      cols={4}
      style={styles.gridList}>
      <Subheader>December</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white"/>
          </IconButton>}>
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default ProjectList;