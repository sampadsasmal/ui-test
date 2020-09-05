import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AppService } from '../app.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {
  TREE_DATA = [
    // {
    //   name: 'Fruit',
    //   children: [
    //     {name: 'Apple'},
    //     {name: 'Banana'},
    //     {name: 'Fruit loops'},
    //   ]
    // }, {
    //   name: 'Vegetables',
    //   children: [
    //     {
    //       name: 'Green',
    //       children: [
    //         {name: 'Broccoli'},
    //         {name: 'Brussels sprouts'},
    //       ]
    //     }, {
    //       name: 'Orange',
    //       children: [
    //         {name: 'Pumpkins'},
    //         {name: 'Carrots'},
    //       ]
    //     },
    //   ]
    // },
  ];

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  loader = true;
  constructor(private appService: AppService) {
    const key = JSON.parse(localStorage.getItem('userData'));
    this.appService.hierarchy(key.key).subscribe(data => {
      const myArry = [];
      myArry.push(data.entity.nodeStandardMetadata);
      this.dataSource.data = myArry;
      this.loader = false;
    });
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

}
