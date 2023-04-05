import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['table-expandable-rows-example.css'],
  templateUrl: 'table-expandable-rows-example.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpandableRowsExample {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<cpt_pct>>;

  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ['icd_cd', 'icd_short_desc', 'icd_type', 'percent'];
  innerDisplayedColumns = ['cpt_no', 'cpt_cd', 'cpt_short_desc','percent','price','counts'];
  expandedElement: User | null;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    USERS.forEach(user => {
      if (user.cpt_pct && Array.isArray(user.cpt_pct) && user.cpt_pct.length) {
        this.usersData = [...this.usersData, {...user, cpt_pct: new MatTableDataSource(user.cpt_pct)}];
      } else {
        this.usersData = [...this.usersData, user];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
  }

  toggleRow(element: User) {
    element.cpt_pct && (element.cpt_pct as MatTableDataSource<cpt_pct>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<cpt_pct>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<cpt_pct>).filter = filterValue.trim().toLowerCase());
  }
}

export interface User {
  icd_cd: string;
  icd_short_desc: string;
  icd_type: string;
  percent:string;
  cpt_pct?: cpt_pct[] | MatTableDataSource<cpt_pct>;
}

export interface cpt_pct {
  cpt_no: string;
  cpt_cd: string;
  cpt_short_desc: string;
  percent: string;
  price: string;
  counts: string;
}

export interface UserDataSource {
  icd_cd: string;
  icd_short_desc: string;
  icd_type: string;
  percent:string;
  cpt_pct?: MatTableDataSource<cpt_pct>;
}

const USERS: User[] = [
  {
    icd_cd: "R50.9",
    icd_short_desc: "Fever, unspecified",
    icd_type: "Sug-1",
    percent: "20.14%",
    cpt_pct: [
      {
        cpt_no: "Sug-1",
        cpt_cd: "11",
        cpt_short_desc: "",
        percent: "100.00%",
        price: "230.00",
        counts: "3/3"
      },
      {
        cpt_no: "Sug-2",
        cpt_cd: "76700",
        cpt_short_desc: "US EXAM ABDOM COMPLETE",
        percent: "100.00%",
        price: "342.17",
        counts: "4/4"
      },
      {
        cpt_no: "Sug-3",
        cpt_cd: "84702",
        cpt_short_desc: "CHORIONIC GONADOTROPIN TEST",
        percent: "100.00%",
        price: "63.96",
        counts: "1/1"
      }
    ]
  },
  {
    icd_cd: "R06.02",
    icd_short_desc: "Shortness of breath",
    icd_type: "Sug-2",
    percent: "17.10%",
    cpt_pct: [
      {
        cpt_no: "Sug-1",
        cpt_cd: "11",
        cpt_short_desc: "",
        percent: "100.00%",
        price: "230.00",
        counts: "3/3"
      },
      {
        cpt_no: "Sug-2",
        cpt_cd: "76700",
        cpt_short_desc: "US EXAM ABDOM COMPLETE",
        percent: "100.00%",
        price: "342.17",
        counts: "4/4"
      },
      {
        cpt_no: "Sug-3",
        cpt_cd: "84702",
        cpt_short_desc: "CHORIONIC GONADOTROPIN TEST",
        percent: "100.00%",
        price: "63.96",
        counts: "1/1"
      }
    ]
  }
]

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */