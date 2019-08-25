import rows from './test.json'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
const JsonTable = require('ts-react-json-table');

var columns = [
    {key: 'location', label: 'Location'},
    {key: 'product', label: 'Product'},
    {key: 'date', label: 'Date'},
    {key: 'temp_mean', label: 'Mean Temp'},
    {key: 'temp_max', label: 'Max Temp'},
    {key: 'temp_min', label: 'Min Temp'},
    {key: 'sunshine_quant', label: 'Sunshine'},
    {key: 'event', label: 'Event'},
    {key: 'price', label: 'Price'}
]
var reduce = function(row, memo) {
    memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount)
    return memo
}
var calculations = [
    {
      title: 'Amount', value: 'amountTotal',
      template: function(val, row) {
        return '$' + val.toFixed(2)
      },
      sortBy: function(row) {
        return isNaN(row.amountTotal) ? 0 : row.amountTotal
      }
    }
]
export default function PaginationTable(){
    return(
        <ResponsiveContainer>        
            <JsonTable rows = {rows} columns = {columns} className ={"pure-table-horizontal"}/>
        </ResponsiveContainer>
    );
}