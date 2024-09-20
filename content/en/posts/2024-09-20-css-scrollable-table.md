---
title: Add a Horizontal Scrollbar to a Table with CSS
date: 2024-09-20T00:00:00+08:00
slug: css-scrollable-table
tags:
  - css
  - web
lastmod: 2024-09-20T00:00:00+08:00
---

Tables with many columns can overflow the page width, which distorts the page layout. Adding a horizontal scrollbar avoids this problem.

To add a horizontal scrollbar to a table, wrap the table in a `<div>` container and apply `overflow-x: auto;` to the container.

```html
<div style="overflow-x: auto;"> <!-- Wrapper -->
  <table>
    <!-- Table content -->
  </table>
</div>
```

Demo ([live preview](https://jsbin.com/zelurisali/2/edit?html,css,output)):

```css
.table-wrapper {
  overflow-x: auto;
}
```

```html
<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
        <th>Header 4</th>
        <th>Header 5</th>
        <th>Header 6</th>
        <th>Header 7</th>
        <th>Header 8</th>
        <th>Header 9</th>
        <th>Header 10</th>
        <th>Header 11</th>
        <th>Header 12</th>
        <th>Header 13</th>
        <th>Header 14</th>
        <th>Header 15</th>
        <th>Header 16</th>
        <th>Header 17</th>
        <th>Header 18</th>
        <th>Header 19</th>
        <th>Header 20</th>
        <th>Header 21</th>
        <th>Header 22</th>
        <th>Header 23</th>
        <th>Header 24</th>
        <th>Header 25</th>
        <th>Header 26</th>
        <th>Header 27</th>
        <th>Header 28</th>
        <th>Header 29</th>
        <th>Header 30</th>
        <th>Header 31</th>
        <th>Header 32</th>
        <th>Header 33</th>
        <th>Header 34</th>
        <th>Header 35</th>
        <th>Header 36</th>
        <th>Header 37</th>
        <th>Header 38</th>
        <th>Header 39</th>
        <th>Header 40</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
        <td>Data 4</td>
        <td>Data 5</td>
        <td>Data 6</td>
        <td>Data 7</td>
        <td>Data 8</td>
        <td>Data 9</td>
        <td>Data 10</td>
        <td>Data 11</td>
        <td>Data 12</td>
        <td>Data 13</td>
        <td>Data 14</td>
        <td>Data 15</td>
        <td>Data 16</td>
        <td>Data 17</td>
        <td>Data 18</td>
        <td>Data 19</td>
        <td>Data 20</td>
        <td>Data 21</td>
        <td>Data 22</td>
        <td>Data 23</td>
        <td>Data 24</td>
        <td>Data 25</td>
        <td>Data 26</td>
        <td>Data 27</td>
        <td>Data 28</td>
        <td>Data 29</td>
        <td>Data 30</td>
        <td>Data 31</td>
        <td>Data 32</td>
        <td>Data 33</td>
        <td>Data 34</td>
        <td>Data 35</td>
        <td>Data 36</td>
        <td>Data 37</td>
        <td>Data 38</td>
        <td>Data 39</td>
        <td>Data 40</td>
      </tr>
    </tbody>
  </table>
</div>
```