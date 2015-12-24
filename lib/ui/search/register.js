import { SearchCriteria } from 'mosaic-dataset-index';
import { SuggestionView, SelectionView } from 'mosaic-ui-autocomplete';
import SearchCriteriaSuggestionView from './SearchCriteriaSuggestionView';
import SearchCriteriaSelectionView from './SearchCriteriaSelectionView';

export default function(adapters){
    adapters.registerAdapter(SearchCriteria, SuggestionView, SearchCriteriaSuggestionView); 
    adapters.registerAdapter(SearchCriteria, SelectionView, SearchCriteriaSelectionView);
}