describe 'get /api/v1/images/search', type: :request do
  let(:search_term) { 'cat' }

  context 'when the call to giphy is successful' do
    let(:giphy_response) do
      File.read('spec/fixtures/external/giphy/images_search_response.json')
    end

    before do
      stub_request(:get, %r{https://api.giphy.com/v1/search'}).
        to_return(body: giphy_response, status: 200)
    end

    it 'returns search results' do
      get "/api/v1/images/search?search_term=#{search_term}"

      expect(response.status).to be 200
      expect(JSON.parse(response.body)).to eq([
        {
          src: 'an image src',
          title: 'a cool title'
        },
        {
          src: 'another image src',
          title: 'another title'
        }
      ])
    end
  end

  context 'when the call to giphy is not successful' do
    before do
      stub_request(:get, %r{https://api.giphy.com/v1/search'}).
        to_return(body: {}.to_json, status: 500)
    end

    it 'returns an error' do
      get "/api/v1/images/search?search_term=#{search_term}"

      expect(response.status).to be 500
      expect(JSON.parse(response.body)).to eq({
        message: 'An error occured'
      })
    end
  end
end
