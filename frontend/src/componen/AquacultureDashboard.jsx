import '@fortawesome/fontawesome-free/css/all.min.css';
import { ChevronDown, Edit3, RefreshCw } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card } from './CardManagement';
import MetricModal from './MetricsModal';



const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white rounded-lg p-2 ${className}`}
    >
      {children}
    </button>
  );
};

const AquacultureDashboard = ({ data = {} }) => {
  const [value, setValue] = useState(1);
  const [firstInput, setFirstInput] = useState("0");
  const [secondInput, setSecondInput] = useState("100");
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClicking, setIsClicking] = useState(false); //
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0); 
  const sliderRef = useRef(null);

  const openModal = (metric) => {
    if (isClicking) { 
      setSelectedMetric(metric);
    }
  };

  const closeModalMetric = () => {
    setSelectedMetric(null);
  };
  const handleMouseDown = (e) => {
    const isCard = e.target.closest(".metric-card");
  
    if (isCard) {
      setIsClicking(true); 
      setDragDistance(0);  
      return;  
    }
  
    setIsDragging(true); 
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    setIsClicking(false); 
    setDragDistance(0);  
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      sliderRef.current.style.cursor = 'grab';
      if (dragDistance < 10) {
        setIsClicking(true); 
      }
    }
    
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
    
    setDragDistance(Math.abs(walk)); 
  };

  
  // Sample growth data for the chart
  const growthData = [
    { doc: '1.0d', pH: 7.2, satu: 28, dua: 15, tiga: 10 },
    { doc: '2.0d', pH: 7.1, satu: 27, dua: 14, tiga: 9 },
    { doc: '3.0d', pH: 7.3, satu: 29, dua: 16, tiga: 11 }
  ];


  const metrics = [
    {
      id: 1,
      label: 'Estimasi Biomassa',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-weight-hanging',
      color: 'text-blue-500',
      tableHeaders: ['Nama Kolam', 'DoC (Hari)', 'Biomassa', 'Panen kumulatif'],
      tableRows: [['-', '-', '-', '-']]
    },
    { id:2,
      label: 'Panen Kumulatif',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-fish',
      color: 'text-green-500',
      tableHeaders: ['Nama Kolam', 'DoC (Hari)', 'Panen (Kg)'],
      tableRows: [['-', '-', '-']]
    },
    {id:3,
      label: 'Pakan Kumulatif',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-utensils',
      color: 'text-yellow-500',
      tableHeaders: ['Nama Kolam', 'DoC (Hari)', 'Pakan (Kg)'],
      tableRows: [['K1', '-', '-']]
    },
    { id:4,
      label: 'Estimasi SR',
      value: '0',
      unit: '% dari 1 kolam',
      icon: 'fas fa-chart-line',
      color: 'text-red-500',
      tableHeaders: ['Nama Kolam', 'DoC (Hari)', 'Survival Rate (SR) (%)'],
      tableRows: [['K1', '-', '-']]
    },
    { id:5,
      label: 'Estimasi Nilai Jual',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-database',
      color: 'text-cyan-500',
      tableHeaders: ['Nama Kolam', 'DoC (Hari)', 'Size (ekor/kg)', 'Harga/kg', 'Estimasi Nilai Jual'],
      tableRows: [['-', '-', '-', 'Rp.16.000,00', 'Rp.106.000,00']]
    }
  ];
  

  const handleRefresh = () => {
    setFirstInput("0");
    setSecondInput("100");
  };

  return (
    <div className="w-full max-w-6xl p-4">
      <div
      className="overflow-x-auto flex space-x-5 py-4 cursor-grab"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between relative border-2 border-gray-300 min-w-[250px] mx-2 select-none metric-card"
          onClick={() => openModal(metric)}

        >
          <div className={`absolute top-2 right-2 ${metric.color} rounded-full p-2`}>
            <i className={`${metric.icon} ${metric.color} text-lg`}></i>
          </div>

          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-2">{metric.label}</h4>
            <p className={`${metric.color} text-3xl font-bold`}>{metric.value}</p>
          </div>
          <p className="text-gray-500 text-sm">{metric.unit}</p>
        </div>
      ))}
      {selectedMetric && (
        <MetricModal metric={selectedMetric} onClose={closeModalMetric} />
      )}
    </div>

      {/* Main Content Card */}
      <Card className='border-2 w-[1120px] mt-10 mr-20 ml-2'>
        <div className="flex justify-between items-center m-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Kolam:</span>
              <div className="relative">
                <select className="h-8 px-8 border border-blue-600 rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-600 appearance-none">
                  <option value="k1">k1</option>
                  <option value="k2">k2</option>
                  <option value="k3">k3</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-blue-600" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">RFID:</span>
              <span className="text-blue-500 cursor-pointer">
                <Edit3 className="h-4 w-4" />
              </span>

            </div>
            <Link to="/PengaturanTambak" className="text-blue-500">Detail kolam</Link>
          </div>
          <div className="flex space-x-2">
            <h4 className='text-gray-500'>Data budidaya</h4>
          </div>
        </div>
        <hr className="w-[100vw] border-gray-300 border" style={{ position: "relative", left: "50%", transform: "translateX(-50%)" }} />
        <div className="flex gap-4 w-full">
          {/* Kolom Kiri - Statistik */}
          <div className="flex-1 space-y-4 m-6">
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span>DoC</span>
                <span>{value}/100</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-lg">
                <div
                  className="h-2 bg-blue-500 rounded-lg"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between">
              <span>Tebaran:</span>
              <span className='mr-2'>31</span>
            </div>
            <div className="text-lg font-medium mt-6 mb-2">Estimasi pertumbuhan</div>
            <div className="">
              <div className="flex justify-between bg-blue-50 p-2 ">
                <span>FCR:</span>
                <span>1.01</span>
              </div>
              <div className="flex justify-between bg-blue-200 p-2 ">
                <span>ADG:</span>
                <span>0.06 g</span>
              </div>
              <div className="flex justify-between bg-blue-100 p-2 ">
                <span>SR:</span>
                <span>100%</span>
              </div>
              <div className="flex justify-between bg-blue-200 p-2 ">
                <span>MBW:</span>
                <span>0.06 g</span>
              </div>
              <div className="flex justify-between bg-blue-100 p-2 mb-6 ">
                <span>Size:</span>
                <span>16,256.33</span>
              </div>
            </div>
            <Button className="w-full bg-blue-500">Konsultasi</Button>
            <div className="flex justify-center">
              <button
                onClick={() => console.log("Ubah Pengaturan Siklus")}
                className="text-blue-500  hover:text-blue-700 focus:outline-none"
              >
                Ubah Pengaturan Siklus
              </button>
            </div>

          </div>
          {/* Garis Tengah */}
          <div className="w-px bg-gray-300 self-stretch m-0"></div>
          {/* Kolom Kanan - Grafik */}
          <div className="flex-1 space-y-6 m-6 w-[800px]">

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4 ">
                <span>Menampilkan:</span>
                <div className="relative">
                  <select className="h-8 px-2 w-[150px] border border-blue-600 rounded-md bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-600 appearance-none">
                    <option value="">MWB (Gram)</option>
                    <option value="1"> 10</option>
                    <option value="2"> 20</option>
                    <option value="3"> 30</option>
                    <option value="4"> 40</option>

                  </select>
                  <ChevronDown className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-blue-600" />
                </div>
              </div>

              {/* Bagian Kanan: Rentang DoC */}
              <div className="flex items-center space-x-2">
                <span className='w-[120px] ml-4'>Rentang DoC:</span>
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    className="w-12 h-8 bg-blue-200 rounded-lg px-2 text-center"
                    defaultValue="0"
                    value={firstInput}
                    onChange={(e) => setFirstInput(e.target.value)}
                  />
                  <span>—</span>
                  <input
                    type="text"
                    className="w-12 h-8 bg-blue-200 rounded-lg px-2 text-center"
                    defaultValue="100"
                    value={secondInput}
                    onChange={(e) => setSecondInput(e.target.value)}
                  />
                </div> <button className="h-8 w-8 p-0 text-center flex items-center justify-center bg-blue-200 rounded-full"
                  onClick={handleRefresh} >
                  <RefreshCw className="h-5 w-5" />
                </button>

              </div>

            </div>

            {/* Grafik LineChart */}
            <LineChart width={500} height={300} data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doc" />
              <YAxis />
              <Line type="monotone" dataKey="pH" stroke="#8884d8" />
              <Line type="monotone" dataKey="satu" stroke="#82ca9d" />
              <Line type="monotone" dataKey="dua" stroke="#ffc658" />
            </LineChart>

            {/* Legenda */}
            <div className="flex justify-center mt-4 space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Aktual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Estimasi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Target</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AquacultureDashboard;