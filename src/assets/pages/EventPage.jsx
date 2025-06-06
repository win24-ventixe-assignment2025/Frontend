import { useEffect } from 'react';
import { usePageTitle } from '../../contexts/PageTitleContext';
import EventList from '../components/EventList'

const EventPage = () => {
    const {setTitle} = usePageTitle();
  
    useEffect(() => {
      setTitle('Events')
    }, []);
  return (

        <main>
            <EventList/>
        </main>


  )
}

export default EventPage