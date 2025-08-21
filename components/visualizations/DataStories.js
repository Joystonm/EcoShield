import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/DataStories.module.css';

const DataStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const chartRefs = useRef([]);
  const timelineRef = useRef(null);

  // Environmental data stories
  const stories = [
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

  const animateChart = (story) => {
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

  const animateBarChart = (story, container) => {
    const bars = container.querySelectorAll('.chart-bar');
    
    anime({
      targets: bars,
      height: (el, i) => `${(story.data[i].value / Math.max(...story.data.map(d => d.value))) * 100}%`,
      backgroundColor: story.color,
      delay: anime.stagger(200),
      duration: 1000,
      easing: 'easeOutElastic(1, .8)'
    });
  };

  const animateLineChart = (story, container) => {
    const points = container.querySelectorAll('.chart-point');
    const line = container.querySelector('.chart-line');
    
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
      line.style.strokeDasharray = pathLength;
      line.style.strokeDashoffset = pathLength;
      
      anime({
        targets: line,
        strokeDashoffset: 0,
        duration: 2000,
        delay: 300,
        easing: 'easeInOutQuart'
      });
    }
  };

  const animateAreaChart = (story, container) => {
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

  const animateNumbers = (story, container) => {
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
          number.textContent = Math.round(obj.value * 10) / 10;
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

  const renderChart = (story) => {
    const maxValue = Math.max(...story.data.map(d => d.value));
    const minValue = Math.min(...story.data.map(d => d.value));
    const range = maxValue - minValue;

    switch (story.type) {
      case 'bar':
        return (
          <div className={styles.barChart}>
            {story.data.map((point, index) => (
              <div key={index} className={styles.barContainer}>
                <div 
                  className="chart-bar"
                  style={{
                    height: '0%',
                    backgroundColor: story.color,
                    opacity: 0.8
                  }}
                />
                <span className={styles.barLabel}>{point.label}</span>
                <span className={`${styles.barValue} animated-number`}>0</span>
              </div>
            ))}
          </div>
        );

      case 'line':
        return (
          <div className={styles.lineChart}>
            <svg viewBox="0 0 400 200" className={styles.chartSvg}>
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
            <div className={styles.lineLabels}>
              {story.data.map((point, index) => (
                <div key={index} className={styles.lineLabel}>
                  <span>{point.label}</span>
                  <span className="animated-number">0</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'area':
        return (
          <div className={styles.areaChart}>
            <svg viewBox="0 0 400 200" className={styles.chartSvg}>
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
            
            <div className={styles.areaLabels}>
              {story.data.map((point, index) => (
                <div key={index} className={styles.areaLabel}>
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
    <div className={styles.container}>
      {/* Story Header */}
      <motion.div 
        className={styles.storyHeader}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{stories[currentStory].title}</h2>
        <p>{stories[currentStory].subtitle}</p>
      </motion.div>

      {/* Main Chart Area */}
      <div className={styles.chartArea}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className={styles.chartContainer}
            ref={el => chartRefs.current[currentStory] = el}
          >
            {renderChart(stories[currentStory])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Story Description */}
      <motion.div 
        className={styles.storyDescription}
        key={`desc-${currentStory}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p>{stories[currentStory].description}</p>
        <div className={styles.dataUnit}>
          Unit: <span>{stories[currentStory].unit}</span>
        </div>
      </motion.div>

      {/* Controls */}
      <div className={styles.controls}>
        <button 
          className={styles.controlButton}
          onClick={prevStory}
          disabled={isPlaying}
        >
          ← Previous
        </button>
        
        <button 
          className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
          onClick={playStory}
          disabled={isPlaying}
        >
          {isPlaying ? '⏸️ Playing...' : '▶️ Animate'}
        </button>
        
        <button 
          className={styles.controlButton}
          onClick={nextStory}
          disabled={isPlaying}
        >
          Next →
        </button>
      </div>

      {/* Timeline Navigation */}
      <div className={styles.timeline} ref={timelineRef}>
        {stories.map((story, index) => (
          <motion.button
            key={story.id}
            className={`${styles.timelineItem} ${currentStory === index ? styles.active : ''}`}
            onClick={() => setCurrentStory(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              backgroundColor: currentStory === index ? story.color : 'transparent',
              borderColor: story.color 
            }}
          >
            <span className={styles.timelineNumber}>{index + 1}</span>
            <span className={styles.timelineTitle}>{story.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar}
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
