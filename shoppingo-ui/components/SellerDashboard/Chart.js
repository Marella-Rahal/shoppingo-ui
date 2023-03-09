import React, { PureComponent,useState } from 'react';
import { BarChart, Bar,Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes'



const Chart = () => {
  

  const [year, setYear] = useState( [
    {
      name: 'Jan',
      earn: 2400,
    
    },
    {
      name: 'Feb',
      earn: 1398,

      
    },
    {
      name: 'Mar',
      earn: 9800,
    
    },
    {
      name: 'Apr',
      earn: 3908,
      },
    {
      name: 'May',
      earn: 4800,
      },
    {
      name: 'June',
      earn: 3800,
      },
    {
      name: 'July',
      earn: 4300,
      },
    {
      name: 'Aug',
      earn: 2400,
    
    },
    {
      name: 'Sept',
      earn: 2400,
    
    },
    {
      name: 'Oct',
      earn: 1950,
    
    },
    {
      name: 'Nov',
      earn: 4000,
    
    },
    {
      name: 'Dec',
      earn: 2500,
    
    },
  ]);

  const [month, setMonth] = useState( [
    {
      name: '1',
      earn: 2400,
      fill:' rgb(17 29 74 / 0.9)',
    
    },
    {
      name: '2',
      earn: 1398,
      fill:'#D7271A',

      
    },
    {
      name: '3',
      earn: 9800,
      fill:' rgb(17 29 74 / 0.9)',
    
    },
    {
      name: '4',
      earn: 3908,
      fill:'#D7271A',
      },
    {
      name: '5',
      earn: 4800,
      fill:' rgb(17 29 74 / 0.9)'
      },
    {
      name: '6',
      earn: 3800,
      fill:'#D7271A'
      },
    {
      name: '7',
      earn: 4300,
      fill:' rgb(17 29 74 / 0.9)'
      },
    {
      name: '8',
      earn: 2400,
      fill:'#D7271A'
    
    },
    {
      name: '9',
      earn: 2400,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '10',
      earn: 1950,
      fill:'#D7271A'
    
    },
    {
      name: '11',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '12',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '13',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '14',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '15',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '16',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '17',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '18',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '19',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '20',
      earn: 25000,
      fill:'#D7271A'
    
    },
    {
      name: '21',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '22',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '23',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '24',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '25',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '26',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '27',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '28',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '29',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '30',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '31',
      earn: 2500,
      fill:'rgb(17 29 74 / 0.9)'
    
    },
  ]);

  const [day, setDay] = useState( [
    {
      name: '1',
      earn: 2400,
      fill:' rgb(17 29 74 / 0.9)',
    
    },
    {
      name: '2',
      earn: 1398,
      fill:'#D7271A',

      
    },
    {
      name: '3',
      earn: 9800,
      fill:' rgb(17 29 74 / 0.9)',
    
    },
    {
      name: '4',
      earn: 3908,
      fill:'#D7271A',
      },
    {
      name: '5',
      earn: 4800,
      fill:' rgb(17 29 74 / 0.9)'
      },
    {
      name: '6',
      earn: 3800,
      fill:'#D7271A'
      },
    {
      name: '7',
      earn: 4300,
      fill:' rgb(17 29 74 / 0.9)'
      },
    {
      name: '8',
      earn: 2400,
      fill:'#D7271A'
    
    },
    {
      name: '9',
      earn: 2400,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '10',
      earn: 1950,
      fill:'#D7271A'
    
    },
    {
      name: '11',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '12',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '13',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '14',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '15',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '16',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '17',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '18',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '19',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '20',
      earn: 25000,
      fill:'#D7271A'
    
    },
    {
      name: '21',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '22',
      earn: 2500,
      fill:'#D7271A'
    
    },
    {
      name: '23',
      earn: 4000,
      fill:' rgb(17 29 74 / 0.9)'
    
    },
    {
      name: '24',
      earn: 2500,
      fill:'#D7271A'
    
    },
  ]);


  const [data,setData]=useState(year);
  
  const handleChange = (event) => {
   
    if(event.target.value=="day")
      setData(day);
    else if(event.target.value == "month")
      setData(month);
    else 
      setData(year)
  };  
  const { theme, setTheme } = useTheme();



  return (
    <>
    <div className='flex justify-end space-x-3'>
          <select  className='rounded-lg bg-white text-textColor text-end shadow-md shadow-shadowColor px-2 outline-none'  onChange={handleChange}>
            <option value="year">السنة الحالية</option>
            <option value="month" >الشهر الحالي</option>
            <option value="day">اليوم الحالي</option>
          </select>
          <div className='text-lg' >
            : تصنيف حسب 
          </div>
    </div>
    
    <ResponsiveContainer width="100%" height='100%'>
      <BarChart
        data={data}
       
      >
        {/* <CartesianGrid  /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{fill: 'transparent'}}/>
        
        <Bar dataKey="earn"  >
        {
                  data.map((entry, index) => (
                    <Cell key={index} fill={ theme == "light" ? index%2 == 1  ? 'rgb(17 29 74 / 0.9)' : '#D7271A': index%2 == 1  ? 'black' : 'white'   }/>
                  ))
                }
           
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </>
  )
}

export default Chart
