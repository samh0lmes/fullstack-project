module External
  module Giphy
    describe 'ImageSearcher' do
      let(:api_key) { 'some-key' }

      before do
        allow(ENV).
          to receive(:fetch).
          with('GIPHY_API_KEY').
          and_return(api_key)
      end

      let(:search_results) do
        {
          data: [
            {
              id: '1',
              title: 'Dancing Cat',
              images: {
                fixed_width: {
                  url: 'dancing_cat.gif'
                }
              }
            }
          ]
        }
      end
      let(:user) { User.create }

      context 'when the user favorited an image in the search' do
        before do
          user.favorite_images << Image.create!(external_id: 1, src: 'dancing_cat.gif', title: 'Dancing Cat')
        end

        it 'makes a request to giphy images search endpoint with the provided search term with favorited true' do
          expect(RestClient).
            to receive(:get).
            with("https://api.giphy.com/v1/gifs/search?api_key=#{api_key}&q=cat").
            and_return(OpenStruct.new(body: search_results.to_json))

            expect(ImageSearcher.search_images!(search_term: 'cat', user_id: user.id)).to eq([{ external_id: '1', src: 'dancing_cat.gif', title: 'Dancing Cat', favorited: true }])
        end
      end

      context 'when the user has not favorited an image in the search' do
        it 'makes a request to giphy images search endpoint with the provided search term with favorited true' do
          expect(RestClient).
            to receive(:get).
            with("https://api.giphy.com/v1/gifs/search?api_key=#{api_key}&q=cat").
            and_return(OpenStruct.new(body: search_results.to_json))

            expect(ImageSearcher.search_images!(search_term: 'cat', user_id: user.id)).to eq([{ external_id: '1', src: 'dancing_cat.gif', title: 'Dancing Cat', favorited: false }])
        end
      end
    end
  end
end
