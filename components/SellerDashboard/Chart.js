import React, { PureComponent,useState } from 'react';
import { BarChart, Bar,Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes'



const Chart = () => {
  

  const [year, setYear] = useState( [
    {
      name: 'Jan',
      earn: 0,
    
    },
    {
      name: 'Feb',
      earn: 0,

      
    },
    {
      name: 'Mar',
      earn: 0,
    
    },
    {
      name: 'Apr',
      earn: 0,
      },
    {
      name: 'May',
      earn: 0,
      },
    {
      name: 'June',
      earn: 0,
      },
    {
      name: 'July',
      earn: 500000,
      },
    {
      name: 'Aug',
      earn: 300000,
    
    },
    {
      name: 'Sept',
      earn: 0,
    
    },
    {
      name: 'Oct',
      earn: 0,
    
    },
    {
      name: 'Nov',
      earn: 0,
    
    },
    {
      name: 'Dec',
      earn: 0,
    
    },
  ]);

  const [month, setMonth] = useState( [
    {
      name: '1',
      earn: 0,
    
    },
    {
      name: '2',
      earn: 0,

      
    },
    {
      name: '3',
      earn: 0,
    
    },
    {
      name: '4',
      earn: 0,
      },
    {
      name: '5',
      earn: 0,
      },
    {
      name: '6',
      earn: 0,
      },
    {
      name: '7',
      earn: 0,
      },
    {
      name: '8',
      earn: 0,
    
    },
    {
      name: '9',
      earn: 0,
    
    },
    {
      name: '10',
      earn: 0,
    
    },
    {
      name: '11',
      earn: 0,
    
    },
    {
      name: '12',
      earn: 300000,
    
    },
    {
      name: '13',
      earn: 0,
    
    },
    {
      name: '14',
      earn: 0,
    
    },
    {
      name: '15',
      earn: 0,
    
    },
    {
      name: '16',
      earn: 0,
    
    },
    {
      name: '17',
      earn: 0,
    
    },
    {
      name: '18',
      earn: 0,
    
    },
    {
      name: '19',
      earn: 0,
    
    },
    {
      name: '20',
      earn: 0,
    
    },
    {
      name: '21',
      earn: 0,
    
    },
    {
      name: '22',
      earn: 0,
    
    },
    {
      name: '23',
      earn: 0,
    
    },
    {
      name: '24',
      earn: 0,
    
    },
    {
      name: '25',
      earn: 0,
    
    },
    {
      name: '26',
      earn: 0,
      fill:'#D7271A'
    
    },
    {
      name: '27',
      earn: 0,
    
    },
    {
      name: '28',
      earn: 0,
    
    },
    {
      name: '29',
      earn: 0,
    
    },
    {
      name: '30',
      earn: 0,
    
    },
    {
      name: '31',
      earn: 0,
    
    },
  ]);

  const [day, setDay] = useState( [
    {
      name: '12 AM',
      earn: 0,
      fill:' rgb(17 29 74 / 0.9)',
    
    },
    {
      name: '1 AM',
      earn: 0,
      fill:' rgb(17 29 74 / 0.9)',
    
    },
    {
      name: '2 AM',
      earn: 0,

      
    },
    {
      name: '3 AM',
      earn: 0,
    
    },
    {
      name: '4 AM',
      earn: 0,
      },
    {
      name: '5 AM',
      earn: 0,
      },
    {
      name: '6 AM',
      earn: 0,
      },
    {
      name: '7 AM',
      earn: 0,
      },
    {
      name: '8 AM',
      earn: 0,
    
    },
    {
      name: '9 AM',
      earn: 0,
    
    },
    {
      name: '10 AM',
      earn: 0,
    
    },
    {
      name: '11 AM',
      earn: 300000,
    
    },
    {
      name: '12 PM',
      earn: 0,
    
    },
    {
      name: '1 PM',
      earn: 0,
    
    },
    {
      name: '2 PM',
      earn: 0,
    
    },
    {
      name: '3 PM',
      earn: 0,    
    },
    {
      name: '4 PM',
      earn: 0,
    
    },
    {
      name: '5 PM',
      earn: 0,
    
    },
    {
      name: '6 PM',
      earn: 0,
    
    },
    {
      name: '7 PM',
      earn: 0,
    
    },
    {
      name: '8 PM',
      earn: 0,
    
    },
    {
      name: '9 PM',
      earn: 0,
    
    },
    {
      name: '10 PM',
      earn: 0,
    
    },
    {
      name: '11 PM',
      earn: 0,
    
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
          <select  className='rounded-lg bg-white text-textColor dark:text-darkBgColor text-end shadow-md shadow-shadowColor px-2 outline-none'  onChange={handleChange}>
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
        <Tooltip cursor={{fill: 'transparent' }} labelStyle={{color:"black"}} />
        
        <Bar dataKey="earn"   >
        {
                  data.map((entry, index) => (
                    <Cell key={index} fill={ theme == "light" ? index%2 == 1  ? 'rgb(17 29 74 / 0.9)' : '#D7271A': index%2 == 1  ? 'gray' : 'white'   } />
                  ))
        }
           
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </>
  )
}

export default Chart
