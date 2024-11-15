import React from "react";
import {
  BarChart3,
  Droplets,
  Activity,
  Database,
  LineChart,
  TrendingUp,
} from "lucide-react";
import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function LaporanDashboard() {

  async function handleExport() {
    const input = document.getElementById("dashboard-content");
  
    if (!input) {
      console.error("Element with ID 'dashboard-content' not found.");
      return;
    }

    const originalStyles = {};
    const elementsWithBorders = input.querySelectorAll("select, button");
    
    elementsWithBorders.forEach((el, index) => {
      originalStyles[index] = {
        border: el.style.border,
        boxShadow: el.style.boxShadow,
        background: el.style.background
      };
      el.style.border = "none";
      el.style.boxShadow = "none";
      el.style.background = "transparent";
    });
  
    const style = document.createElement("style");
    style.innerHTML = `
      #dashboard-content {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
        font-family: Arial, sans-serif;  
      }
  
      #dashboard-content .keterangan {
        white-space: normal; 
        word-break: break-word;  
        font-size: 14px;  
        list-style-type: none !important;  
        padding-left: 0 !important; 
      }
  
      
  
      #dashboard-content select, 
      #dashboard-content button {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
        color: inherit !important;
      }
  
      #dashboard-content select, 
      #dashboard-content button,
      #dashboard-content .select-label, 
      #dashboard-content .export-label {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: null,
        useCORS: true
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("laporan_budidaya_tambak_lele.pdf");
    } finally {
      document.head.removeChild(style);
      elementsWithBorders.forEach((el, index) => {
        el.style.border = originalStyles[index].border;
        el.style.boxShadow = originalStyles[index].boxShadow;
        el.style.background = originalStyles[index].background;
      });
    }
  }
  



  return (
    <div className="space-y-6 space-x-6 bg-white w-full min-h-screen ">
      <Header />
      <div className="p-6 ">
        {/* Header Section */}
        <div className="mb-20 mr-4">
          <div className="flex justify-between items-center mb-4 mr-1 ">
            <h2 className="font-bold">Laporan Budidaya Tambak Lele</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <label className="block text-sm mb-2">Tambak:</label>
                <div className="relative">
                  <select className="w-[400px] p-2 pr-10 border rounded-md appearance-none">
                    <option>Lele segar</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex-1 relative">
                <label className="block text-sm mb-2">Periode:</label>
                <div className="relative">
                  <select className="w-[200px] p-2 pr-10 border rounded-md appearance-none">
                    <option>Oktober 2024</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div id="dashboard-content" className="bg-white p-6 rounded-lg border  border-blue-500 mr-4">
          {/* Card Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Tambak Lele Segar</h2>
            <div className="flex gap-2">
              <div className="relative">
                <select id="#select-element-id" className="w-[200px] border p-2 pr-10 rounded-md appearance-none">
                  <option>Pilih Kolam</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                />
              </div>
              <button id="#export-button-id" className="w-[100px] bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleExport}>
                Ekspor
              </button>
            </div>
          </div>

          {/* Report Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold">LAPORAN BUDIDAYA</h2>
            <h3 className="text-blue-500">Lele Segar</h3>
          </div>

          {/* Info Section */}
          <div className="mb-8 mt-10">
            <div className="flex mb-1">
              <span className="font-medium w-32">Lokasi Tambak</span>
              <span className="mr-2">:</span>
              <span>Jawa Tengah, Boyolali, Tegalsari</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Jumlah Kolam</span>
              <span className="mr-2">:</span>
              <span>4</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Periode Siklus</span>
              <span className="mr-2">:</span>
              <span>1 Oktober 2024 - Sekarang</span>
            </div>
          </div>

          <div className="text-center mb-10 mt-20">
            <h3 className="text-blue-700 inline-block border-b-4 border-blue-700 pb-1">
              Detail
            </h3>
          </div>

          {/* Metrics First Row */}
          <div className="grid grid-cols-3 gap-8 mb-10">
            <MetricCard
              icon={<BarChart3 />}
              title="Hasil Panen"
              description="Data pada Kolam B3, Kolam B4 tidak lengkap"
            />
            <MetricCard
              icon={<Activity />}
              title="Nilai SFR"
              description="Nilai Survival Rate (SR) dalam nilai yang baik (&gt;80%)"
            />
            <MetricCard
              icon={<Database />}
              title="Nilai FCR"
              description="Data pada Kolam B3, Kolam B4 tidak lengkap"
            />
          </div>

          {/* Metrics Second Row */}
          <div className="grid grid-cols-3 gap-8 mb-10">
            <MetricCard
              icon={<Droplets />}
              title="Kualitas Air"
              description="Data pada Kolam B3, Kolam B4 tidak lengkap"
            />
            <MetricCard
              icon={<LineChart />}
              title="Daya Dukung Lahan"
              description="Daya dukung lahan sudah dipertimbangkan dengan baik"
            />
            <MetricCard
              icon={<TrendingUp />}
              title="Pertumbuhan Lele"
              description="Data pada Kolam B3, Kolam B4 tidak lengkap"
            />
          </div>

          {/* Performance Indicators */}
          <div className="flex gap-6 mb-6 mt-20">
            <Indicator color="yellow-500" text="Peforma Kolam Biasa" />
            <Indicator color="green-500" text="Peforma Kolam Terbaik" />
            <Indicator color="red-500" text="Peforma Kolam Terburuk" />
          </div>

          {/* Table Section */}
          <TableSection />
          {/* Notes Section */}
          <div className="mt-14 mb-10">
            <p className="font-medium mb-2">Keterangan:</p>
            <ul className="list-decimal list-inside space-y-1 keterangan">
              <li>Penilaian peforma kolam bersifat relatif</li>
              <li>
                Penilaian kolam dengan peforma baik berdasarkan hasil panen
                optimal, nilai FCR rendah, dan nilai SR tinggi.
              </li>
              <li>
                Penilaian kolam dengan peforma buruk berdasarkan hasil panen
                rendah, nilai FCR tinggi, dan nilai SR rendah.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, description }) {
  return (
    <div className="text-center">
      {React.cloneElement(icon, {
        className: "w-12 h-12 mx-auto mb-2 text-blue-500",
      })}
      <p className="font-medium mb-2">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function Indicator({ color, text }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full bg-${color}`}></div>
      <span>{text}</span>
    </div>
  );
}

function TableSection() {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 border">Nomor Kolam</th>
            <th className="py-2 px-4 border">Luas Kolam</th>
            <th className="py-2 px-4 border">DOC (Hari)</th>
            <th className="py-2 px-4 border">Jumlah Benih</th>
            <th className="py-2 px-4 border">Padat Tebar</th>
            <th className="py-2 px-4 border">Total Pakan</th>
            <th className="py-2 px-4 border">Biomassa Panen</th>
            <th className="py-2 px-4 border">Size Panen</th>
            <th className="py-2 px-4 border">FCR</th>
            <th className="py-2 px-4 border">SR</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-green-500">
            <td className="py-2 px-4 border">Kolam B3</td>
            <td className="py-2 px-4 border">1900 m²</td>
            <td className="py-2 px-4 border">60</td>
            <td className="py-2 px-4 border">100.000</td>
            <td className="py-2 px-4 border">60(mg/m²)</td>
            <td className="py-2 px-4 border">15 kg</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">100%</td>
          </tr>
          <tr className="bg-yellow-500">
            <td className="py-2 px-4 border">Kolam B4</td>
            <td className="py-2 px-4 border">1800 m²</td>
            <td className="py-2 px-4 border">60</td>
            <td className="py-2 px-4 border">100.000</td>
            <td className="py-2 px-4 border">48(mg/m²)</td>
            <td className="py-2 px-4 border">12 kg</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">100%</td>
          </tr>
          <tr className="bg-blue-500 text-white">
            <td colSpan="5" className="py-2 px-4 text-center">
              Total
            </td>
            <td className="py-2 px-4 border">12 kg</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border"> </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function LaporanBudidaya() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <LaporanDashboard />
        <div className="mt-20">
        <Footer />
        </div>
        <AIFloatingButton />
      </div>
    </div>
  );
}

export default LaporanBudidaya;
