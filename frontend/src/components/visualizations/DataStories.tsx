import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import '../../styles/DataStories.css';

interface DataPoint {
  year: number;
  value: number;
  label: string;
}

interface Story {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  data: DataPoint[];
  color: string;
  unit: string;
  type: 'line' | 'bar' | 'area';
}

const DataStories: React.FC = () => {
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Environmental data stories
  const stories: Story[] = [
    {
      id: 0,
      title: "Rising Global Temperatures",
      subtitle: "Temperature anomalies over the past century",
      description: "Global average temperatures have risen by 1.1°C since pre-industrial times, with accelerating warming in recent decades.",
      data: [
        { year: 1920, value: -0.2, label: "1920s" },
        { year: 1940, value: 0.1, label: "1940s" },
        { year: 1960, value: -0.1, label: "1960s" },
        { year: 1980, value: 0.3, label: "1980s" },
        { year: 2000, value: 0.6, label: "2000s" },
        { year: 2020, value: 1.1, label: "2020s" }
      ],
      color: "#ff6b6b",
      unit: "°C",
      type: "line"
    },
    {
      id: 1,
      title: "Atmospheric CO₂ Levels",
      subtitle: "Carbon dioxide concentration in the atmosphere",
      description: "CO₂ levels have increased by over 40% since pre-industrial times, reaching record highs of 420+ ppm.",
      data: [
        { year: 1960, value: 315, label: "1960" },
        { year: 1980, value: 340, label: "1980" },
        { year: 2000, value: 370, label: "2000" },
        { year: 2010, value: 390, label: "2010" },
        { year: 2020, value: 415, label: "2020" },
        { year: 2024, value: 425, label: "2024" }
      ],
      color: "#4ecdc4",
      unit: "ppm",
      type: "bar"
    },
    {
      id: 2,
      title: "Global Forest Loss",
      subtitle: "Deforestation rates worldwide",
      description: "We lose approximately 10 million hectares of forest annually, equivalent to the size of South Korea.",
      data: [
        { year: 2000, value: 100, label: "2000" },
        { year: 2005, value: 95, label: "2005" },
        { year: 2010, value: 88, label: "2010" },
        { year: 2015, value: 82, label: "2015" },
        { year: 2020, value: 76, label: "2020" },
        { year: 2024, value: 71, label: "2024" }
      ],
      color: "#45b7d1",
      unit: "% of 2000 levels",
      type: "area"
    },
    {
      id: 3,
      title: "Renewable Energy Growth",
      subtitle: "Global renewable energy capacity",
      description: "Renewable energy capacity has grown exponentially, offering hope for a sustainable future.",
      data: [
        { year: 2010, value: 1320, label: "2010" },
        { year: 2012, value: 1580, label: "2012" },
        { year: 2014, value: 1850, label: "2014" },
        { year: 2016, value: 2200, label: "2016" },
        { year: 2018, value: 2580, label: "2018" },
        { year: 2020, value: 3064, label: "2020" },
        { year: 2022, value: 3372, label: "2022" },
        { year: 2024, value: 3870, label: "2024" }
      ],
      color: "#96ceb4",
      unit: "GW",
      type: "line"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      animateChart(stories[currentStory]);
    }
  }, [currentStory, isPlaying]);

  const animateChart = (story: Story) => {
    const chartContainer = chartRefs.current[story.id];
    if (!chartContainer) return;

    // Clear previous animations
    anime.remove(chartContainer.querySelectorAll('.chart-bar, .chart-point, .chart-area'));

    // Animate based on chart type
    switch (story.type) {
      case 'bar':
        animateBarChart(story, chartContainer);
        break;
      case 'line':
        animateLineChart(story, chartContainer);
        break;
      case 'area':
        animateAreaChart(story, chartContainer);
        break;
      default:
        animateBarChart(story, chartContainer);
    }

    // Animate numbers
    animateNumbers(story, chartContainer);
  };

  const animateBarChart = (story: Story, container: HTMLDivElement) => {
    const bars = container.querySelectorAll('.chart-bar');
    
    anime({
      targets: bars,
      height: (el: Element, i: number) => `${(story.data[i].value / Math.max(...story.data.map(d => d.value))) * 100}%`,
      backgroundColor: story.color,
      delay: anime.stagger(200),
      duration: 1000,
      easing: 'easeOutElastic(1, .8)'
    });
  };

  const animateLineChart = (story: Story, container: HTMLDivElement) => {
    const points = container.querySelectorAll('.chart-point');
    const line = container.querySelector('.chart-line') as SVGPathElement;
    
    // Animate points
    anime({
      targets: points,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 800,
      easing: 'easeOutBack'
    });

    // Animate line path
    if (line) {
      const pathLength = line.getTotalLength();
      line.style.strokeDasharray = pathLength.toString();
      line.style.strokeDashoffset = pathLength.toString();
      
      anime({
        targets: line,
        strokeDashoffset: 0,
        duration: 2000,
        delay: 300,
        easing: 'easeInOutQuart'
      });
    }
  };

  const animateAreaChart = (story: Story, container: HTMLDivElement) => {
    const area = container.querySelector('.chart-area');
    const points = container.querySelectorAll('.chart-point');
    
    if (area) {
      anime({
        targets: area,
        opacity: [0, 0.6],
        scaleY: [0, 1],
        duration: 1500,
        easing: 'easeOutQuart'
      });
    }

    anime({
      targets: points,
      scale: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutBack'
    });
  };

  const animateNumbers = (story: Story, container: HTMLDivElement) => {
    const numbers = container.querySelectorAll('.animated-number');
    
    numbers.forEach((number, index) => {
      const targetValue = story.data[index].value;
      const obj = { value: 0 };
      
      anime({
        targets: obj,
        value: targetValue,
        duration: 1500,
        delay: index * 100,
        easing: 'easeOutQuart',
        update: () => {
          (number as HTMLElement).textContent = (Math.round(obj.value * 10) / 10).toString();
        }
      });
    });
  };

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const playStory = () => {
    setIsPlaying(true);
    animateChart(stories[currentStory]);
    
    // Auto-advance after animation
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const renderChart = (story: Story) => {
    const maxValue = Math.max(...story.data.map(d => d.value));
    const minValue = Math.min(...story.data.map(d => d.value));
    const range = maxValue - minValue;

    switch (story.type) {
      case 'bar':
        return (
          <div className="bar-chart">
            {story.data.map((point, index) => (
              <div key={index} className="bar-container">
                <div 
                  className="chart-bar"
                  style={{
                    height: '0%',
                    backgroundColor: story.color,
                    opacity: 0.8
                  }}
                />
                <span className="bar-label">{point.label}</span>
                <span className="bar-value animated-number">0</span>
              </div>
            ))}
          </div>
        );

      case 'line':
        return (
          <div className="line-chart">
            <svg viewBox="0 0 400 200" className="chart-svg">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="400"
                  y2={i * 40}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
              
              {/* Line path */}
              <path
                className="chart-line"
                d={`M ${story.data.map((point, index) => 
                  `${(index / (story.data.length - 1)) * 380 + 10},${
                    190 - ((point.value - minValue) / range) * 180
                  }`
                ).join(' L ')}`}
                fill="none"
                stroke={story.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              {story.data.map((point, index) => (
                <circle
                  key={index}
                  className="chart-point"
                  cx={(index / (story.data.length - 1)) * 380 + 10}
                  cy={190 - ((point.value - minValue) / range) * 180}
                  r="6"
                  fill={story.color}
                  stroke="white"
                  strokeWidth="2"
                  style={{ transform: 'scale(0)', opacity: 0 }}
                />
              ))}
            </svg>
            
            {/* Labels */}
            <div className="line-labels">
              {story.data.map((point, index) => (
                <div key={index} className="line-label">
                  <span>{point.label}</span>
                  <span className="animated-number">0</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'area':
        return (
          <div className="area-chart">
            <svg viewBox="0 0 400 200" className="chart-svg">
              {/* Area fill */}
              <path
                className="chart-area"
                d={`M 10,190 L ${story.data.map((point, index) => 
                  `${(index / (story.data.length - 1)) * 380 + 10},${
                    190 - ((point.value - minValue) / range) * 180
                  }`
                ).join(' L ')} L 390,190 Z`}
                fill={story.color}
                opacity="0"
              />
              
              {/* Data points */}
              {story.data.map((point, index) => (
                <circle
                  key={index}
                  className="chart-point"
                  cx={(index / (story.data.length - 1)) * 380 + 10}
                  cy={190 - ((point.value - minValue) / range) * 180}
                  r="5"
                  fill="white"
                  stroke={story.color}
                  strokeWidth="3"
                  style={{ transform: 'scale(0)' }}
                />
              ))}
            </svg>
            
            <div className="area-labels">
              {story.data.map((point, index) => (
                <div key={index} className="area-label">
                  <span>{point.label}</span>
                  <span className="animated-number">0</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="data-stories-container">
      {/* Story Header */}
      <div className="story-header">
        <h2>{stories[currentStory].title}</h2>
        <p>{stories[currentStory].subtitle}</p>
      </div>

      {/* Main Chart Area */}
      <div className="chart-area">
        <div
          key={currentStory}
          className="chart-container"
          ref={el => chartRefs.current[currentStory] = el}
        >
          {renderChart(stories[currentStory])}
        </div>
      </div>

      {/* Story Description */}
      <div className="story-description">
        <p>{stories[currentStory].description}</p>
        <div className="data-unit">
          Unit: <span>{stories[currentStory].unit}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="story-controls">
        <button 
          className="control-button"
          onClick={prevStory}
          disabled={isPlaying}
        >
          ← Previous
        </button>
        
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={playStory}
          disabled={isPlaying}
        >
          {isPlaying ? '⏸️ Playing...' : '▶️ Animate'}
        </button>
        
        <button 
          className="control-button"
          onClick={nextStory}
          disabled={isPlaying}
        >
          Next →
        </button>
      </div>

      {/* Timeline Navigation */}
      <div className="timeline" ref={timelineRef}>
        {stories.map((story, index) => (
          <button
            key={story.id}
            className={`timeline-item ${currentStory === index ? 'active' : ''}`}
            onClick={() => setCurrentStory(index)}
            style={{ 
              backgroundColor: currentStory === index ? story.color : 'transparent',
              borderColor: story.color 
            }}
          >
            <span className="timeline-number">{index + 1}</span>
            <span className="timeline-title">{story.title}</span>
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${((currentStory + 1) / stories.length) * 100}%`,
            backgroundColor: stories[currentStory].color 
          }}
        />
      </div>
    </div>
  );
};

export default DataStories;
